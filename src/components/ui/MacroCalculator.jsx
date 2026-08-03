import React, { useState, useEffect } from 'react';

export default function MacroCalculator() {
  const [weight, setWeight] = useState(80); // kg
  const [height, setHeight] = useState(180); // cm
  const [age, setAge] = useState(28); // years
  const [gender, setGender] = useState('male'); // male, female
  const [activity, setActivity] = useState(1.55); // sedentary to extreme factors
  const [goal, setGoal] = useState('maintain'); // lose, maintain, gain

  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState('');
  const [calories, setCalories] = useState(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });

  // Recalculate everything on input change
  useEffect(() => {
    // 1. BMI Calculation
    const heightInMeters = height / 100;
    const computedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(computedBmi.toFixed(1));

    let status = '';
    if (computedBmi < 18.5) status = 'Underweight';
    else if (computedBmi < 25) status = 'Normal';
    else if (computedBmi < 30) status = 'Overweight';
    else status = 'Obese';
    setBmiStatus(status);

    // 2. BMR calculation (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 3. TDEE calculation
    const tdee = bmr * activity;

    // 4. Goal adjustments
    let targetCal = Math.round(tdee);
    if (goal === 'lose') targetCal -= 500;
    if (goal === 'gain') targetCal += 500;
    setCalories(targetCal);

    // 5. Macro split calculations
    // Protein: 2.2g per kg body weight (1g = 4 kcal)
    let proteinGrams = Math.round(weight * 2.2);
    let proteinKcal = proteinGrams * 4;

    // Fat: 25% of total calories (1g = 9 kcal)
    let fatKcal = targetCal * 0.25;
    let fatGrams = Math.round(fatKcal / 9);

    // Carbs: Remaining calories (1g = 4 kcal)
    let carbKcal = targetCal - (proteinKcal + fatKcal);
    let carbGrams = Math.round(Math.max(0, carbKcal) / 4);

    setMacros({
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams
    });

  }, [weight, height, age, gender, activity, goal]);

  // Color maps for BMI category status
  const getBmiColor = () => {
    if (bmiStatus === 'Normal') return '#d4ff00'; // Lime
    if (bmiStatus === 'Underweight') return '#00f2fe'; // Blue
    if (bmiStatus === 'Overweight') return '#ff5722'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className="titanium-card" style={{ padding: '32px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
          METRIC METERS
        </span>
        <h3 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#fff' }}>
          FUEL & MACRO CALCULATOR
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '0.95rem' }}>
          Calculate your metabolic rate, body mass status, and custom nutritional profile based on biometric data inputs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {/* Left Side: Biometrics Sliders & Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Gender selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.05em' }}>
              BIOLOGICAL GENDER
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  style={{
                    flex: 1,
                    backgroundColor: gender === g ? 'rgba(255, 87, 34, 0.1)' : 'transparent',
                    border: gender === g ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    color: gender === g ? '#fff' : 'var(--text-secondary)',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Slider: Weight */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                WEIGHT (KG)
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '700', fontFamily: 'monospace' }}>
                {weight} kg
              </span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="150" 
              value={weight} 
              onChange={(e) => setWeight(parseInt(e.target.value))} 
              className="custom-range"
            />
          </div>

          {/* Slider: Height */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                HEIGHT (CM)
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '700', fontFamily: 'monospace' }}>
                {height} cm
              </span>
            </div>
            <input 
              type="range" 
              min="120" 
              max="220" 
              value={height} 
              onChange={(e) => setHeight(parseInt(e.target.value))} 
              className="custom-range"
            />
          </div>

          {/* Slider: Age */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                AGE (YEARS)
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '700', fontFamily: 'monospace' }}>
                {age} yrs
              </span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="80" 
              value={age} 
              onChange={(e) => setAge(parseInt(e.target.value))} 
              className="custom-range"
            />
          </div>

          {/* Activity dropdown selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.05em' }}>
              WEEKLY PHYSICAL ACTIVITY
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              style={{
                width: '100%',
                backgroundColor: '#131318',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="1.2">Sedentary (Little/no exercise)</option>
              <option value="1.375">Light Activity (1-3 days/week)</option>
              <option value="1.55">Moderate Activity (3-5 days/week)</option>
              <option value="1.725">Heavy Activity (6-7 days/week)</option>
              <option value="1.9">Extreme Load (Twice-daily training/athlete)</option>
            </select>
          </div>

          {/* Target Goal selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.05em' }}>
              FITNESS GOAL
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { key: 'lose', label: 'SHRED (-500 kcal)' },
                { key: 'maintain', label: 'MAINTAIN' },
                { key: 'gain', label: 'BULK (+500 kcal)' }
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => setGoal(g.key)}
                  style={{
                    flex: 1,
                    backgroundColor: goal === g.key ? '#ff5722' : 'rgba(255, 255, 255, 0.02)',
                    border: goal === g.key ? '1px solid #ff5722' : '1px solid rgba(255, 255, 255, 0.06)',
                    color: '#fff',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Generated Target Metrics */}
        <div 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            borderRadius: '12px', 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          {/* Top segment: BMI & Calories */}
          <div>
            {/* BMI display row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>BODY MASS INDEX (BMI)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'monospace' }}>{bmi}</span>
                  <span style={{ color: getBmiColor(), fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    • {bmiStatus}
                  </span>
                </div>
              </div>
              <div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: `${getBmiColor()}20`, 
                  border: `2px solid ${getBmiColor()}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getBmiColor(),
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}
              >
                BMI
              </div>
            </div>

            {/* Custom calorie display block */}
            <div 
              style={{ 
                background: 'linear-gradient(135deg, #181822 0%, #121217 100%)', 
                border: '1px solid rgba(255,255,255,0.04)', 
                borderRadius: '8px', 
                padding: '20px', 
                textAlign: 'center',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                DAILY TARGET CALORIE INTAKE
              </span>
              <h2 className="text-display glow-text" style={{ fontSize: '3rem', color: 'var(--primary)', marginTop: '8px', letterSpacing: '0.02em' }}>
                {calories} <span style={{ fontSize: '1rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>KCAL / DAY</span>
              </h2>
            </div>
          </div>

          {/* Bottom segment: Macronutrient Targets */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              TARGET MACRONUTRIENT BREAKDOWN
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Protein Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>PROTEIN (Muscle Repair)</span>
                  <span style={{ color: '#fff', fontFamily: 'monospace' }}>
                    {macros.protein}g <span style={{ color: 'var(--text-secondary)' }}>({Math.round((macros.protein * 4 / calories) * 100) || 0}%)</span>
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#131317', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(macros.protein * 4 / calories) * 100 || 0}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Carbs Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>CARBOHYDRATES (Explosive Energy)</span>
                  <span style={{ color: '#fff', fontFamily: 'monospace' }}>
                    {macros.carbs}g <span style={{ color: 'var(--text-secondary)' }}>({Math.round((macros.carbs * 4 / calories) * 100) || 0}%)</span>
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#131317', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(macros.carbs * 4 / calories) * 100 || 0}%`, height: '100%', backgroundColor: '#d4ff00', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Fat Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>FAT (Hormonal Balance)</span>
                  <span style={{ color: '#fff', fontFamily: 'monospace' }}>
                    {macros.fat}g <span style={{ color: 'var(--text-secondary)' }}>({Math.round((macros.fat * 9 / calories) * 100) || 0}%)</span>
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#131317', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(macros.fat * 9 / calories) * 100 || 0}%`, height: '100%', backgroundColor: '#00f2fe', borderRadius: '4px' }} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
