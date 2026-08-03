import React, { useState } from 'react';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

const INITIAL_CLASSES = {
  MONDAY: [
    { id: 'm1', name: 'Powerlifting Fundamentals', time: '07:00 AM - 08:30 AM', instructor: 'Rex Sterling', capacity: 12, booked: 8 },
    { id: 'm2', name: 'HIIT Fire Blast', time: '09:30 AM - 10:30 AM', instructor: 'Marcus Thorne', capacity: 20, booked: 16 },
    { id: 'm3', name: 'Iron Back & Deadlifts', time: '05:30 PM - 07:00 PM', instructor: 'Rex Sterling', capacity: 10, booked: 9 },
    { id: 'm4', name: 'Boxing Grind', time: '07:30 PM - 08:30 PM', instructor: 'Marcus Thorne', capacity: 15, booked: 11 }
  ],
  TUESDAY: [
    { id: 't1', name: 'Olympic Snatch Technique', time: '08:00 AM - 09:30 AM', instructor: 'Elena Vlasov', capacity: 8, booked: 5 },
    { id: 't2', name: 'Core & Mobility Flow', time: '10:00 AM - 11:00 AM', instructor: 'Elena Vlasov', capacity: 25, booked: 10 },
    { id: 't3', name: 'Heavy Duty Squats', time: '05:00 PM - 06:30 PM', instructor: 'Rex Sterling', capacity: 10, booked: 8 },
    { id: 't4', name: 'Athletic Speed Drills', time: '07:00 PM - 08:00 PM', instructor: 'Marcus Thorne', capacity: 18, booked: 14 }
  ],
  WEDNESDAY: [
    { id: 'w1', name: 'Push Press Strength', time: '07:30 AM - 09:00 AM', instructor: 'Rex Sterling', capacity: 12, booked: 7 },
    { id: 'w2', name: 'Tabata Shred', time: '09:30 AM - 10:30 AM', instructor: 'Marcus Thorne', capacity: 20, booked: 18 },
    { id: 'w3', name: 'Metabolic Conditioning', time: '06:00 PM - 07:00 PM', instructor: 'Elena Vlasov', capacity: 15, booked: 12 },
    { id: 'w4', name: 'Iron Yoga', time: '07:30 PM - 08:30 PM', instructor: 'Elena Vlasov', capacity: 22, booked: 15 }
  ],
  THURSDAY: [
    { id: 'th1', name: 'Olympic Clean & Jerk', time: '08:00 AM - 09:30 AM', instructor: 'Elena Vlasov', capacity: 8, booked: 7 },
    { id: 'th2', name: 'Core Crusher HIIT', time: '10:30 AM - 11:30 AM', instructor: 'Marcus Thorne', capacity: 20, booked: 12 },
    { id: 'th3', name: 'Bench Press PR Clinic', time: '05:30 PM - 07:00 PM', instructor: 'Rex Sterling', capacity: 10, booked: 6 },
    { id: 'th4', name: 'Grappling & Wrestling', time: '07:30 PM - 09:00 PM', instructor: 'Marcus Thorne', capacity: 16, booked: 13 }
  ],
  FRIDAY: [
    { id: 'f1', name: 'Full-Body Power Build', time: '07:00 AM - 08:30 AM', instructor: 'Rex Sterling', capacity: 15, booked: 11 },
    { id: 'f2', name: 'Sled Pulls & Kettlebells', time: '09:30 AM - 10:30 AM', instructor: 'Marcus Thorne', capacity: 18, booked: 15 },
    { id: 'f3', name: 'Posterior Chain focus', time: '05:00 PM - 06:30 PM', instructor: 'Elena Vlasov', capacity: 12, booked: 10 },
    { id: 'f4', name: 'Friday Night Fight Boxing', time: '07:00 PM - 08:30 PM', instructor: 'Marcus Thorne', capacity: 25, booked: 20 }
  ],
  SATURDAY: [
    { id: 'sa1', name: 'Weekend Warrior Strongman', time: '09:00 AM - 11:00 AM', instructor: 'Rex & Marcus', capacity: 30, booked: 27 },
    { id: 'sa2', name: 'Mobility & Foam Rolling', time: '11:30 AM - 12:30 PM', instructor: 'Elena Vlasov', capacity: 25, booked: 8 }
  ],
  SUNDAY: [
    { id: 'su1', name: 'Active Recovery Flow', time: '10:00 AM - 11:30 AM', instructor: 'Elena Vlasov', capacity: 30, booked: 12 },
    { id: 'su2', name: 'Open Gym Max Out Session', time: '12:00 PM - 03:00 PM', instructor: 'All Coaches', capacity: 50, booked: 42 }
  ]
};

export default function ClassScheduler({ onBookSpot }) {
  const [selectedDay, setSelectedDay] = useState('MONDAY');
  const [scheduleState, setScheduleState] = useState(INITIAL_CLASSES);
  const [bookedClasses, setBookedClasses] = useState([]); // Track user's bookings

  const handleBook = (day, classId, className, instructor) => {
    // If already booked, ignore
    if (bookedClasses.includes(classId)) return;

    // Update capacity locally
    setScheduleState(prev => {
      const updated = { ...prev };
      updated[day] = updated[day].map(c => {
        if (c.id === classId) {
          return { ...c, booked: c.booked + 1 };
        }
        return c;
      });
      return updated;
    });

    setBookedClasses(prev => [...prev, classId]);
    
    // Call parent handler to show toast
    if (onBookSpot) {
      onBookSpot(className, instructor);
    }
  };

  const currentClasses = scheduleState[selectedDay] || [];

  return (
    <div className="titanium-card" style={{ padding: '32px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-secondary" style={{ marginBottom: '12px' }}>
          LIVE CALENDAR
        </span>
        <h3 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#fff' }}>
          CLASS BOOKING PORTAL
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: '0.95rem' }}>
          Select a day to view scheduled elite sessions. Secure your booking directly—spots are strictly limited.
        </p>
      </div>

      {/* Week Day Selector Tabs */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          paddingBottom: '12px',
          marginBottom: '28px',
          scrollbarWidth: 'none', // hide scrollbar for clean tab look
          msOverflowStyle: 'none'
        }}
      >
        {DAYS.map((day) => {
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.02)',
                border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap'
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Class Lists Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentClasses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No structured classes scheduled. Open Gym access is active.
          </div>
        ) : (
          currentClasses.map((cls) => {
            const isBooked = bookedClasses.includes(cls.id);
            const spotsLeft = cls.capacity - cls.booked;
            const percentageFilled = (cls.booked / cls.capacity) * 100;
            const isFull = spotsLeft <= 0;

            return (
              <div
                key={cls.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                  border: isBooked ? '1px solid var(--primary-glow)' : '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '8px',
                  padding: '20px',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'var(--transition-smooth)',
                  boxShadow: isBooked ? '0 0 15px rgba(255, 87, 34, 0.05)' : 'none'
                }}
              >
                {/* Time & Class Name info */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: '1 1 300px' }}>
                  {/* Time Circle */}
                  <div 
                    style={{ 
                      minWidth: '70px', 
                      textAlign: 'center',
                      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingRight: '20px',
                      color: 'var(--primary)',
                      fontFamily: 'monospace',
                      fontWeight: '700',
                      fontSize: '0.85rem'
                    }}
                  >
                    {cls.time.split(' - ')[0]}
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                      {cls.name}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Coach: <strong style={{ color: '#fff' }}>{cls.instructor}</strong>
                    </span>
                  </div>
                </div>

                {/* Capacity Tracker bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '180px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: isFull ? '#ef4444' : 'var(--text-secondary)' }}>
                      {isFull ? 'FULLY BOOKED' : `${spotsLeft} spots available`}
                    </span>
                    <span style={{ color: '#fff', fontFamily: 'monospace' }}>
                      {cls.booked}/{cls.capacity}
                    </span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#131317', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${percentageFilled}%`, 
                        height: '100%', 
                        backgroundColor: isBooked ? 'var(--primary)' : isFull ? '#ef4444' : '#d4ff00', 
                        borderRadius: '3px',
                        transition: 'width 0.3s ease'
                      }} 
                    />
                  </div>
                </div>

                {/* Action button */}
                <button
                  disabled={isBooked || isFull}
                  onClick={() => handleBook(selectedDay, cls.id, cls.name, cls.instructor)}
                  style={{
                    backgroundColor: isBooked ? 'rgba(212, 255, 0, 0.15)' : isFull ? '#222' : 'transparent',
                    border: isBooked ? '1px solid #d4ff00' : isFull ? '1px solid #333' : '1px solid var(--primary)',
                    color: isBooked ? '#d4ff00' : isFull ? '#555' : '#fff',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    cursor: isBooked || isFull ? 'default' : 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    transition: 'var(--transition-smooth)',
                    boxShadow: !isBooked && !isFull ? '0 0 10px rgba(255, 87, 34, 0.1)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isBooked && !isFull) {
                      e.currentTarget.style.backgroundColor = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 87, 34, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isBooked && !isFull) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.1)';
                    }
                  }}
                >
                  {isBooked ? '✓ SELECTED' : isFull ? 'LOCKED' : 'BOOK SPOT'}
                </button>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
