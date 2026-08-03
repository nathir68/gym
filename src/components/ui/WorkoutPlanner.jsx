import React, { useState } from 'react';

const GOALS = {
  SHRED: {
    title: 'SHRED & TONE',
    description: 'High-intensity conditioning paired with resistance sets to maximize fat loss and core definition.',
    accent: '#ff5722'
  },
  BULK: {
    title: 'HYPERTROPHY BULK',
    description: 'Classic bodybuilding splits focused on mechanical tension and volume to build massive muscle mass.',
    accent: '#d4ff00'
  },
  POWER: {
    title: 'POWERLIFTING STRENGTH',
    description: 'Low-rep, high-load compound lifting designed around Bench, Squat, and Deadlift PR progression.',
    accent: '#00f2fe'
  },
  ATHLETIC: {
    title: 'COMBAT ATHLETICISM',
    description: 'Explosive plyometrics, rotational power, and speed-endurance sets for peak functional output.',
    accent: '#ec4899'
  }
};

const PLANS = {
  SHRED: {
    rookie: [
      { day: 'Day 1: Upper Body Shred', exercises: [{ name: 'Incline Dumbbell Press', sets: 4, reps: '12-15' }, { name: 'Dumbbell Rows', sets: 4, reps: '12' }, { name: 'Lateral Raises', sets: 3, reps: '15' }, { name: 'Facepulls', sets: 3, reps: '15' }] },
      { day: 'Day 2: Lower Body Burn', exercises: [{ name: 'Goblet Squats', sets: 4, reps: '15' }, { name: 'Romanian Deadlifts', sets: 4, reps: '12' }, { name: 'Walking Lunges', sets: 3, reps: '20 steps' }, { name: 'Hanging Leg Raises', sets: 3, reps: 'AMRAP' }] },
      { day: 'Day 3: HIIT Conditioning', exercises: [{ name: 'Kettlebell Swings', sets: 4, reps: '45 sec work' }, { name: 'Thrusters', sets: 4, reps: '15' }, { name: 'Burpees', sets: 4, reps: '30 sec work' }, { name: 'Plank Holds', sets: 4, reps: '60 sec' }] }
    ],
    dedicated: [
      { day: 'Day 1: Chest & Back Shred', exercises: [{ name: 'Barbell Bench Press', sets: 4, reps: '10' }, { name: 'Pull-ups', sets: 4, reps: 'AMRAP' }, { name: 'Dumbbell Flyes', sets: 3, reps: '15' }, { name: 'Lat Pulldowns', sets: 3, reps: '12' }] },
      { day: 'Day 2: Quads & Abs', exercises: [{ name: 'Front Squats', sets: 4, reps: '12' }, { name: 'Leg Press', sets: 4, reps: '15' }, { name: 'Leg Extensions', sets: 3, reps: '20' }, { name: 'Cable Crunches', sets: 4, reps: '15' }] },
      { day: 'Day 3: Shoulders & Arms', exercises: [{ name: 'Overhead Press', sets: 4, reps: '10' }, { name: 'Incline DB Curls', sets: 3, reps: '12' }, { name: 'Tricep Pushdowns', sets: 3, reps: '12' }, { name: 'Upright Rows', sets: 3, reps: '12' }] },
      { day: 'Day 4: Posterior Chain & HIIT', exercises: [{ name: 'Sumo Deadlifts', sets: 4, reps: '8' }, { name: 'Hamstring Curls', sets: 4, reps: '12' }, { name: 'Kettlebell Snatch', sets: 4, reps: '15 per side' }, { name: 'Mountain Climbers', sets: 4, reps: '45 sec' }] }
    ],
    beast: [
      { day: 'Day 1: Push Hypertrophy', exercises: [{ name: 'Flat DB Bench Press', sets: 4, reps: '12' }, { name: 'Standing DB Press', sets: 4, reps: '12' }, { name: 'Cable Cross', sets: 3, reps: '15' }, { name: 'Skull Crushers', sets: 3, reps: '12' }] },
      { day: 'Day 2: Pull Hypertrophy', exercises: [{ name: 'Barbell Row', sets: 4, reps: '10' }, { name: 'Chinups', sets: 4, reps: '10' }, { name: 'Hammer Curls', sets: 3, reps: '12' }, { name: 'Facepulls', sets: 4, reps: '15' }] },
      { day: 'Day 3: Leg Burn', exercises: [{ name: 'Back Squats', sets: 4, reps: '10' }, { name: 'RDLs', sets: 4, reps: '12' }, { name: 'Bulgarian Split Squats', sets: 3, reps: '12 each' }, { name: 'Calf Raises', sets: 4, reps: '20' }] },
      { day: 'Day 4: Cardio Conditioning', exercises: [{ name: 'Assault Bike Sprint', sets: 6, reps: '30s sprint / 30s rest' }, { name: 'Sled Pushes', sets: 5, reps: '40 meters' }, { name: 'Medicine Ball Slams', sets: 4, reps: '20' }, { name: 'Battle Ropes', sets: 4, reps: '45s work' }] },
      { day: 'Day 5: Core & Recovery Drill', exercises: [{ name: 'Hanging Leg Toes-to-Bar', sets: 4, reps: '12' }, { name: 'Russian Twists', sets: 4, reps: '30' }, { name: 'Bird Dog', sets: 3, reps: '10 each' }, { name: 'Plank Walkouts', sets: 3, reps: '10' }] }
    ]
  },
  BULK: {
    rookie: [
      { day: 'Day 1: Upper Body Push/Pull', exercises: [{ name: 'Flat Bench Press', sets: 4, reps: '8' }, { name: 'Bent Over Rows', sets: 4, reps: '8' }, { name: 'Seated DB Press', sets: 3, reps: '10' }, { name: 'Lat Pulldown', sets: 3, reps: '10' }] },
      { day: 'Day 2: Lower Body Legs', exercises: [{ name: 'Back Squats', sets: 4, reps: '8' }, { name: 'Romanian Deadlifts', sets: 4, reps: '10' }, { name: 'Seated Calf Press', sets: 3, reps: '15' }, { name: 'Ab Rollouts', sets: 3, reps: '12' }] },
      { day: 'Day 3: Arms & Shoulders Focus', exercises: [{ name: 'Barbell Curls', sets: 4, reps: '10' }, { name: 'Lying Tricep Extensions', sets: 4, reps: '10' }, { name: 'Dumbbell Shrugs', sets: 3, reps: '12' }, { name: 'Lateral Raises', sets: 3, reps: '12' }] }
    ],
    dedicated: [
      { day: 'Day 1: Upper Power', exercises: [{ name: 'Incline Barbell Bench', sets: 4, reps: '6' }, { name: 'Weighted Pullups', sets: 4, reps: '6' }, { name: 'Military Press', sets: 3, reps: '8' }, { name: 'Dumbbell Rows', sets: 3, reps: '8' }] },
      { day: 'Day 2: Lower Power', exercises: [{ name: 'Back Squats', sets: 4, reps: '6' }, { name: 'Deficit Deadlifts', sets: 3, reps: '5' }, { name: 'Leg Press', sets: 4, reps: '10' }, { name: 'Standing Calf Raises', sets: 4, reps: '12' }] },
      { day: 'Day 3: Upper Hypertrophy', exercises: [{ name: 'Flat DB Chest Press', sets: 4, reps: '10' }, { name: 'Lat Pulldowns', sets: 4, reps: '10' }, { name: 'Incline Flyes', sets: 3, reps: '12' }, { name: 'Spider Curls', sets: 3, reps: '12' }] },
      { day: 'Day 4: Lower Hypertrophy', exercises: [{ name: 'Hack Squats', sets: 4, reps: '10' }, { name: 'Lying Hamstring Curls', sets: 4, reps: '12' }, { name: 'Leg Extensions', sets: 3, reps: '15' }, { name: 'Glute Ham Raises', sets: 3, reps: '10' }] }
    ],
    beast: [
      { day: 'Day 1: Chest & Triceps', exercises: [{ name: 'Barbell Bench Press', sets: 4, reps: '8' }, { name: 'Incline DB Press', sets: 4, reps: '10' }, { name: 'Weighted Dips', sets: 3, reps: '8' }, { name: 'Cable Tricep Pushdowns', sets: 3, reps: '12' }] },
      { day: 'Day 2: Back & Biceps', exercises: [{ name: 'Barbell Rows', sets: 4, reps: '8' }, { name: 'Weighted Pullups', sets: 4, reps: '8' }, { name: 'Incline DB Curls', sets: 3, reps: '10' }, { name: 'Cable Rows', sets: 3, reps: '12' }] },
      { day: 'Day 3: Shoulders & Traps', exercises: [{ name: 'Seated DB Shoulder Press', sets: 4, reps: '10' }, { name: 'Barbell Shrugs', sets: 4, reps: '10' }, { name: 'Lateral Raises', sets: 4, reps: '12' }, { name: 'Reverse Pec Dec', sets: 3, reps: '15' }] },
      { day: 'Day 4: Quads & Calves', exercises: [{ name: 'Safety Bar Squats', sets: 4, reps: '8' }, { name: 'Leg Press', sets: 4, reps: '12' }, { name: 'Hack Squats', sets: 3, reps: '12' }, { name: 'Seated Calf Raises', sets: 4, reps: '15' }] },
      { day: 'Day 5: Hamstrings & Glutes', exercises: [{ name: 'Sumo Deadlifts', sets: 4, reps: '6' }, { name: 'Stiff Leg Deadlifts', sets: 4, reps: '10' }, { name: 'Bulgarian Split Squats', sets: 3, reps: '12' }, { name: 'Hip Thrusts', sets: 3, reps: '12' }] }
    ]
  },
  POWER: {
    rookie: [
      { day: 'Day 1: Squat Intensity', exercises: [{ name: 'Competition Squat', sets: 5, reps: '5 (75% 1RM)' }, { name: 'Leg Press', sets: 3, reps: '8' }, { name: 'Planks', sets: 3, reps: '60s' }] },
      { day: 'Day 2: Bench Intensity', exercises: [{ name: 'Competition Bench Press', sets: 5, reps: '5 (75% 1RM)' }, { name: 'Dumbbell Rows', sets: 4, reps: '8' }, { name: 'Tricep Pushdowns', sets: 3, reps: '10' }] },
      { day: 'Day 3: Deadlift Intensity', exercises: [{ name: 'Competition Deadlift', sets: 5, reps: '5 (75% 1RM)' }, { name: 'Romanian Deadlifts', sets: 3, reps: '8' }, { name: 'Lat Pulldowns', sets: 3, reps: '10' }] }
    ],
    dedicated: [
      { day: 'Day 1: Squat Strength & Accessories', exercises: [{ name: 'Competition Squat', sets: 5, reps: '3 (82% 1RM)' }, { name: 'Pause Squat', sets: 3, reps: '4' }, { name: 'Bulgarian Split Squats', sets: 3, reps: '8' }, { name: 'Hanging Leg Raises', sets: 3, reps: '15' }] },
      { day: 'Day 2: Bench Press Strength', exercises: [{ name: 'Competition Bench Press', sets: 5, reps: '3 (82% 1RM)' }, { name: 'Close Grip Bench Press', sets: 3, reps: '6' }, { name: 'Barbell Rows', sets: 4, reps: '8' }, { name: 'DB Overhead Press', sets: 3, reps: '10' }] },
      { day: 'Day 3: Deadlift & Pull Focus', exercises: [{ name: 'Competition Deadlift', sets: 5, reps: '3 (82% 1RM)' }, { name: 'Deficit Deadlift', sets: 3, reps: '4' }, { name: 'Good Mornings', sets: 3, reps: '8' }, { name: 'Lat Pulldowns', sets: 4, reps: '10' }] },
      { day: 'Day 4: Overhead Press & Arms Accs', exercises: [{ name: 'Military Press', sets: 4, reps: '6' }, { name: 'Dips', sets: 4, reps: '8' }, { name: 'Hammer Curls', sets: 3, reps: '10' }, { name: 'Facepulls', sets: 4, reps: '15' }] }
    ],
    beast: [
      { day: 'Day 1: Squat Main Heavy', exercises: [{ name: 'Competition Squat', sets: 5, reps: '2 (88% 1RM)' }, { name: 'Pin Squat', sets: 3, reps: '3' }, { name: 'Hack Squats', sets: 3, reps: '8' }, { name: 'Weighted Ab Planks', sets: 3, reps: '45s' }] },
      { day: 'Day 2: Bench Main Heavy', exercises: [{ name: 'Competition Bench Press', sets: 5, reps: '2 (88% 1RM)' }, { name: 'Larsen Press', sets: 3, reps: '4' }, { name: 'Incline DB Press', sets: 3, reps: '8' }, { name: 'Chest Supported Rows', sets: 4, reps: '10' }] },
      { day: 'Day 3: Deadlift Main Heavy', exercises: [{ name: 'Competition Deadlift', sets: 5, reps: '2 (88% 1RM)' }, { name: '2-Board Block Pulls', sets: 3, reps: '3' }, { name: 'Barbell Shrugs', sets: 3, reps: '8' }, { name: 'Pullups', sets: 4, reps: 'AMRAP' }] },
      { day: 'Day 4: Bench Technique & Delts', exercises: [{ name: '3-Sec Pause Bench Press', sets: 4, reps: '4 (70% 1RM)' }, { name: 'Spoto Press', sets: 3, reps: '4' }, { name: 'DB Lateral Raises', sets: 4, reps: '12' }, { name: 'Rear Delt Flyes', sets: 4, reps: '12' }] },
      { day: 'Day 5: Squat Speed & GPP', exercises: [{ name: 'Speed Squats', sets: 6, reps: '2 (55% 1RM) explosive' }, { name: 'Walking Lunges', sets: 3, reps: '15 steps' }, { name: 'Kettlebell Swings', sets: 4, reps: '20' }, { name: 'Sled Drags', sets: 4, reps: '50m' }] }
    ]
  },
  ATHLETIC: {
    rookie: [
      { day: 'Day 1: Explosive Power', exercises: [{ name: 'Barbell Power Clean', sets: 4, reps: '5' }, { name: 'Box Jumps', sets: 4, reps: '6' }, { name: 'Kettlebell Swings', sets: 3, reps: '15' }, { name: 'Medicine Ball Slams', sets: 3, reps: '10' }] },
      { day: 'Day 2: Unilateral Strength', exercises: [{ name: 'Dumbbell Bulgarian Squats', sets: 3, reps: '10 each' }, { name: 'Single-Arm Dumbbell Rows', sets: 3, reps: '10' }, { name: 'Single-Leg RDLs', sets: 3, reps: '10 each' }, { name: 'Plank Rotations', sets: 3, reps: '12' }] },
      { day: 'Day 3: Conditioning Sprint', exercises: [{ name: 'Sprints', sets: 5, reps: '60 meters (full rest)' }, { name: 'Battling Ropes', sets: 4, reps: '30s work' }, { name: 'Farmer Walks', sets: 3, reps: '40 meters' }] }
    ],
    dedicated: [
      { day: 'Day 1: Olympic Lift & Jumps', exercises: [{ name: 'Hang Clean', sets: 4, reps: '4' }, { name: 'Depth Jumps', sets: 4, reps: '5' }, { name: 'Push Press', sets: 4, reps: '6' }, { name: 'Medicine Ball Chest Pass', sets: 3, reps: '8' }] },
      { day: 'Day 2: Tri-Planar Strength', exercises: [{ name: 'Lateral Lunges', sets: 3, reps: '10 each' }, { name: 'Landmine Press & Rotation', sets: 3, reps: '10 each' }, { name: 'Pullups', sets: 4, reps: '8' }, { name: 'Farmer Walks', sets: 3, reps: '50 meters' }] },
      { day: 'Day 3: Rotational Power', exercises: [{ name: 'Rotational Med Ball Slams', sets: 4, reps: '8 each' }, { name: 'Turkish Get-ups', sets: 3, reps: '3 each' }, { name: 'Single-Leg Box Squats', sets: 3, reps: '8 each' }, { name: 'Woodchoppers', sets: 3, reps: '12' }] },
      { day: 'Day 4: GPP Capacity', exercises: [{ name: 'Airdyne Bike Sprints', sets: 8, reps: '20s sprint / 40s active' }, { name: 'Sled Push & Pull', sets: 4, reps: '30m' }, { name: 'Bear Crawls', sets: 3, reps: '30m' }, { name: 'Hanging Core Drills', sets: 3, reps: '15' }] }
    ],
    beast: [
      { day: 'Day 1: Velocity Power Lift', exercises: [{ name: 'Snatch High Pull', sets: 4, reps: '4' }, { name: 'Barbell Clean & Jerk', sets: 4, reps: '3' }, { name: 'Broad Jumps', sets: 4, reps: '5' }, { name: 'Kettlebell Goblet Jump Squat', sets: 3, reps: '8' }] },
      { day: 'Day 2: Heavy Chain & Carry', exercises: [{ name: 'Trap Bar Deadlifts', sets: 4, reps: '6' }, { name: 'Heavy Overhead Walks', sets: 3, reps: '30m' }, { name: 'Weighted Pullups', sets: 4, reps: '6' }, { name: 'Plank Plate Drags', sets: 3, reps: '10' }] },
      { day: 'Day 3: Lateral & Agility Drill', exercises: [{ name: 'Lateral Skater Bounds', sets: 4, reps: '10 each' }, { name: 'Medicine Ball Side Slams', sets: 4, reps: '8 each' }, { name: 'Dumbbell Step-ups', sets: 3, reps: '10 each' }, { name: 'Pallof Press', sets: 3, reps: '12' }] },
      { day: 'Day 4: Hardcore Conditioning', exercises: [{ name: 'Rowing Machine Sprint', sets: 6, reps: '500m' }, { name: 'Sled Drag Sprints', sets: 4, reps: '40m' }, { name: 'Burpee Broad Jumps', sets: 4, reps: '10' }, { name: 'Double Unders', sets: 4, reps: '50' }] },
      { day: 'Day 5: Core Synergy & Mobility', exercises: [{ name: 'Windmills', sets: 3, reps: '8 each' }, { name: 'Dead Bug', sets: 3, reps: '15' }, { name: 'Hanging Toes-To-Bar', sets: 4, reps: '12' }, { name: 'Kettlebell Halo', sets: 3, reps: '10 each' }] }
    ]
  }
};

export default function WorkoutPlanner() {
  const [activeGoal, setActiveGoal] = useState('SHRED');
  const [activeFreq, setActiveFreq] = useState('dedicated'); // rookie, dedicated, beast

  const currentPlan = PLANS[activeGoal][activeFreq] || [];
  const currentTheme = GOALS[activeGoal];

  return (
    <div className="titanium-card" style={{ padding: '32px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span 
          className="badge" 
          style={{ 
            backgroundColor: `${currentTheme.accent}20`, 
            color: currentTheme.accent, 
            border: `1px solid ${currentTheme.accent}40`,
            marginBottom: '12px' 
          }}
        >
          GOAL PATH
        </span>
        <h3 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#fff' }}>
          {currentTheme.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
          {currentTheme.description}
        </p>
      </div>

      {/* Goal selectors (Tabs) */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '10px', 
          marginBottom: '24px' 
        }}
      >
        {Object.entries(GOALS).map(([key, value]) => {
          const isActive = activeGoal === key;
          return (
            <button
              key={key}
              onClick={() => setActiveGoal(key)}
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                border: isActive ? `1.5px solid ${value.accent}` : '1.5px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                padding: '12px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                transition: 'var(--transition-smooth)',
                textAlign: 'center',
                boxShadow: isActive ? `0 0 15px ${value.accent}25` : 'none'
              }}
              onMouseEnter={(e) => {
                if(!isActive) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                if(!isActive) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Frequency / Experience level selectors */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}
      >
        {[
          { key: 'rookie', label: 'ROOKIE (3 DAYS/WK)' },
          { key: 'dedicated', label: 'DEDICATED (4 DAYS/WK)' },
          { key: 'beast', label: 'BEAST MODE (5 DAYS/WK)' }
        ].map((freq) => {
          const isActive = activeFreq === freq.key;
          return (
            <button
              key={freq.key}
              onClick={() => setActiveFreq(freq.key)}
              style={{
                backgroundColor: isActive ? 'var(--primary)' : '#121217',
                border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '6px',
                color: '#fff',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                if(!isActive) e.currentTarget.style.backgroundColor = '#1d1d25';
              }}
              onMouseLeave={(e) => {
                if(!isActive) e.currentTarget.style.backgroundColor = '#121217';
              }}
            >
              {freq.label}
            </button>
          );
        })}
      </div>

      {/* Workout Days Render Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '20px' 
        }}
      >
        {currentPlan.map((p, idx) => (
          <div 
            key={idx}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '20px',
              transition: 'var(--transition-smooth)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top color tag */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: currentTheme.accent }} />
            
            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              {p.day}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {p.exercises.map((ex, exIdx) => (
                <div 
                  key={exIdx} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingBottom: '8px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>
                      {ex.name}
                    </span>
                  </div>
                  <span 
                    style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-secondary)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.04)', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      fontFamily: 'monospace'
                    }}
                  >
                    {ex.sets} × {ex.reps}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Disclaimer / Motivation Footer */}
      <div 
        style={{ 
          marginTop: '32px', 
          textAlign: 'center', 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ width: '6px', height: '6px', backgroundColor: currentTheme.accent, borderRadius: '50%' }} />
        <span>PROGRESS REQUIRES CONSISTENCY. STICK TO THE SPLIT, LIFT HEAVY, RECORD YOUR PRs.</span>
        <span style={{ width: '6px', height: '6px', backgroundColor: currentTheme.accent, borderRadius: '50%' }} />
      </div>
    </div>
  );
}
