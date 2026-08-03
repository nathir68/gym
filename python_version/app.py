import math
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory classes database to manage live booking slots
CLASS_DATABASE = {
  "MONDAY": [
    { "id": "m1", "name": "Powerlifting Fundamentals", "time": "07:00 AM - 08:30 AM", "instructor": "Rex Sterling", "capacity": 12, "booked": 8 },
    { "id": "m2", "name": "HIIT Fire Blast", "time": "09:30 AM - 10:30 AM", "instructor": "Marcus Thorne", "capacity": 20, "booked": 16 },
    { "id": "m3", "name": "Iron Back & Deadlifts", "time": "05:30 PM - 07:00 PM", "instructor": "Rex Sterling", "capacity": 10, "booked": 9 },
    { "id": "m4", "name": "Boxing Grind", "time": "07:30 PM - 08:30 PM", "instructor": "Marcus Thorne", "capacity": 15, "booked": 11 }
  ],
  "TUESDAY": [
    { "id": "t1", "name": "Olympic Snatch Technique", "time": "08:00 AM - 09:30 AM", "instructor": "Elena Vlasov", "capacity": 8, "booked": 5 },
    { "id": "t2", "name": "Core & Mobility Flow", "time": "10:00 AM - 11:00 AM", "instructor": "Elena Vlasov", "capacity": 25, "booked": 10 },
    { "id": "t3", "name": "Heavy Duty Squats", "time": "05:00 PM - 06:30 PM", "instructor": "Rex Sterling", "capacity": 10, "booked": 8 },
    { "id": "t4", "name": "Athletic Speed Drills", "time": "07:00 PM - 08:00 PM", "instructor": "Marcus Thorne", "capacity": 18, "booked": 14 }
  ],
  "WEDNESDAY": [
    { "id": "w1", "name": "Push Press Strength", "time": "07:30 AM - 09:00 AM", "instructor": "Rex Sterling", "capacity": 12, "booked": 7 },
    { "id": "w2", "name": "Tabata Shred", "time": "09:30 AM - 10:30 AM", "instructor": "Marcus Thorne", "capacity": 20, "booked": 18 },
    { "id": "w3", "name": "Metabolic Conditioning", "time": "06:00 PM - 07:00 PM", "instructor": "Elena Vlasov", "capacity": 15, "booked": 12 },
    { "id": "w4", "name": "Iron Yoga", "time": "07:30 PM - 08:30 PM", "instructor": "Elena Vlasov", "capacity": 22, "booked": 15 }
  ],
  "THURSDAY": [
    { "id": "th1", "name": "Olympic Clean & Jerk", "time": "08:00 AM - 09:30 AM", "instructor": "Elena Vlasov", "capacity": 8, "booked": 7 },
    { "id": "th2", "name": "Core Crusher HIIT", "time": "10:30 AM - 11:30 AM", "instructor": "Marcus Thorne", "capacity": 20, "booked": 12 },
    { "id": "th3", "name": "Bench Press PR Clinic", "time": "05:30 PM - 07:00 PM", "instructor": "Rex Sterling", "capacity": 10, "booked": 6 },
    { "id": "th4", "name": "Grappling & Wrestling", "time": "07:30 PM - 09:00 PM", "instructor": "Marcus Thorne", "capacity": 16, "booked": 13 }
  ],
  "FRIDAY": [
    { "id": "f1", "name": "Full-Body Power Build", "time": "07:00 AM - 08:30 AM", "instructor": "Rex Sterling", "capacity": 15, "booked": 11 },
    { "id": "f2", "name": "Sled Pulls & Kettlebells", "time": "09:30 AM - 10:30 AM", "instructor": "Marcus Thorne", "capacity": 18, "booked": 15 },
    { "id": "f3", "name": "Posterior Chain focus", "time": "05:00 PM - 06:30 PM", "instructor": "Elena Vlasov", "capacity": 12, "booked": 10 },
    { "id": "f4", "name": "Friday Night Fight Boxing", "time": "07:00 PM - 08:30 PM", "instructor": "Marcus Thorne", "capacity": 25, "booked": 20 }
  ],
  "SATURDAY": [
    { "id": "sa1", "name": "Weekend Warrior Strongman", "time": "09:00 AM - 11:00 AM", "instructor": "Rex & Marcus", "capacity": 30, "booked": 27 },
    { "id": "sa2", "name": "Mobility & Foam Rolling", "time": "11:30 AM - 12:30 PM", "instructor": "Elena Vlasov", "capacity": 25, "booked": 8 }
  ],
  "SUNDAY": [
    { "id": "su1", "name": "Active Recovery Flow", "time": "10:00 AM - 11:30 AM", "instructor": "Elena Vlasov", "capacity": 30, "booked": 12 },
    { "id": "su2", "name": "Open Gym Max Out Session", "time": "12:00 PM - 03:00 PM", "instructor": "All Coaches", "capacity": 50, "booked": 42 }
  ]
}

# Workout splits database
WORKOUT_PLANS = {
  "SHRED": {
    "rookie": [
      { "day": "Day 1: Upper Body Shred", "exercises": [{ "name": "Incline Dumbbell Press", "sets": 4, "reps": "12-15" }, { "name": "Dumbbell Rows", "sets": 4, "reps": "12" }, { "name": "Lateral Raises", "sets": 3, "reps": "15" }, { "name": "Facepulls", "sets": 3, "reps": "15" }] },
      { "day": "Day 2: Lower Body Burn", "exercises": [{ "name": "Goblet Squats", "sets": 4, "reps": "15" }, { "name": "Romanian Deadlifts", "sets": 4, "reps": "12" }, { "name": "Walking Lunges", "sets": 3, "reps": "20 steps" }, { "name": "Hanging Leg Raises", "sets": 3, "reps": "AMRAP" }] },
      { "day": "Day 3: HIIT Conditioning", "exercises": [{ "name": "Kettlebell Swings", "sets": 4, "reps": "45 sec work" }, { "name": "Thrusters", "sets": 4, "reps": "15" }, { "name": "Burpees", "sets": 4, "reps": "30 sec work" }, { "name": "Plank Holds", "sets": 4, "reps": "60 sec" }] }
    ],
    "dedicated": [
      { "day": "Day 1: Chest & Back Shred", "exercises": [{ "name": "Barbell Bench Press", "sets": 4, "reps": "10" }, { "name": "Pull-ups", "sets": 4, "reps": "AMRAP" }, { "name": "Dumbbell Flyes", "sets": 3, "reps": "15" }, { "name": "Lat Pulldowns", "sets": 3, "reps": "12" }] },
      { "day": "Day 2: Quads & Abs", "exercises": [{ "name": "Front Squats", "sets": 4, "reps": "12" }, { "name": "Leg Press", "sets": 4, "reps": "15" }, { "name": "Leg Extensions", "sets": 3, "reps": "20" }, { "name": "Cable Crunches", "sets": 4, "reps": "15" }] },
      { "day": "Day 3: Shoulders & Arms", "exercises": [{ "name": "Overhead Press", "sets": 4, "reps": "10" }, { "name": "Incline DB Curls", "sets": 3, "reps": "12" }, { "name": "Tricep Pushdowns", "sets": 3, "reps": "12" }, { "name": "Upright Rows", "sets": 3, "reps": "12" }] },
      { "day": "Day 4: Posterior Chain & HIIT", "exercises": [{ "name": "Sumo Deadlifts", "sets": 4, "reps": "8" }, { "name": "Hamstring Curls", "sets": 4, "reps": "12" }, { "name": "Kettlebell Snatch", "sets": 4, "reps": "15 per side" }, { "name": "Mountain Climbers", "sets": 4, "reps": "45 sec" }] }
    ],
    "beast": [
      { "day": "Day 1: Push Hypertrophy", "exercises": [{ "name": "Flat DB Bench Press", "sets": 4, "reps": "12" }, { "name": "Seated DB Press", "sets": 4, "reps": "12" }, { "name": "Cable Cross", "sets": 3, "reps": "15" }, { "name": "Skull Crushers", "sets": 3, "reps": "12" }] },
      { "day": "Day 2: Pull Hypertrophy", "exercises": [{ "name": "Barbell Row", "sets": 4, "reps": "10" }, { "name": "Chinups", "sets": 4, "reps": "10" }, { "name": "Hammer Curls", "sets": 3, "reps": "12" }, { "name": "Facepulls", "sets": 4, "reps": "15" }] },
      { "day": "Day 3: Leg Burn", "exercises": [{ "name": "Back Squats", "sets": 4, "reps": "10" }, { "name": "RDLs", "sets": 4, "reps": "12" }, { "name": "Bulgarian Split Squats", "sets": 3, "reps": "12 each" }, { "name": "Calf Raises", "sets": 4, "reps": "20" }] },
      { "day": "Day 4: Cardio Conditioning", "exercises": [{ "name": "Assault Bike Sprint", "sets": 6, "reps": "30s sprint / 30s rest" }, { "name": "Sled Pushes", "sets": 5, "reps": "40 meters" }, { "name": "Medicine Ball Slams", "sets": 4, "reps": "20" }, { "name": "Battle Ropes", "sets": 4, "reps": "45s work" }] },
      { "day": "Day 5: Core & Recovery", "exercises": [{ "name": "Hanging Leg Toes-to-Bar", "sets": 4, "reps": "12" }, { "name": "Russian Twists", "sets": 4, "reps": "30" }, { "name": "Bird Dog", "sets": 3, "reps": "10 each" }, { "name": "Plank Walkouts", "sets": 3, "reps": "10" }] }
    ]
  },
  "BULK": {
    "rookie": [
      { "day": "Day 1: Upper Body Push/Pull", "exercises": [{ "name": "Flat Bench Press", "sets": 4, "reps": "8" }, { "name": "Bent Over Rows", "sets": 4, "reps": "8" }, { "name": "Seated DB Press", "sets": 3, "reps": "10" }, { "name": "Lat Pulldown", "sets": 3, "reps": "10" }] },
      { "day": "Day 2: Lower Body Legs", "exercises": [{ "name": "Back Squats", "sets": 4, "reps": "8" }, { "name": "Romanian Deadlifts", "sets": 4, "reps": "10" }, { "name": "Seated Calf Press", "sets": 3, "reps": "15" }, { "name": "Ab Rollouts", "sets": 3, "reps": "12" }] },
      { "day": "Day 3: Arms & Shoulders Focus", "exercises": [{ "name": "Barbell Curls", "sets": 4, "reps": "10" }, { "name": "Lying Tricep Extensions", "sets": 4, "reps": "10" }, { "name": "Dumbbell Shrugs", "sets": 3, "reps": "12" }, { "name": "Lateral Raises", "sets": 3, "reps": "12" }] }
    ],
    "dedicated": [
      { "day": "Day 1: Upper Power", "exercises": [{ "name": "Incline Barbell Bench", "sets": 4, "reps": "6" }, { "name": "Weighted Pullups", "sets": 4, "reps": "6" }, { "name": "Military Press", "sets": 3, "reps": "8" }, { "name": "Dumbbell Rows", "sets": 3, "reps": "8" }] },
      { "day": "Day 2: Lower Power", "exercises": [{ "name": "Back Squats", "sets": 4, "reps": "6" }, { "name": "Deficit Deadlifts", "sets": 3, "reps": "5" }, { "name": "Leg Press", "sets": 4, "reps": "10" }, { "name": "Standing Calf Raises", "sets": 4, "reps": "12" }] },
      { "day": "Day 3: Upper Hypertrophy", "exercises": [{ "name": "Flat DB Chest Press", "sets": 4, "reps": "10" }, { "name": "Lat Pulldowns", "sets": 4, "reps": "10" }, { "name": "Incline Flyes", "sets": 3, "reps": "12" }, { "name": "Spider Curls", "sets": 3, "reps": "12" }] },
      { "day": "Day 4: Lower Hypertrophy", "exercises": [{ "name": "Hack Squats", "sets": 4, "reps": "10" }, { "name": "Lying Hamstring Curls", "sets": 4, "reps": "12" }, { "name": "Leg Extensions", "sets": 3, "reps": "15" }, { "name": "Glute Ham Raises", "sets": 3, "reps": "10" }] }
    ],
    "beast": [
      { "day": "Day 1: Chest & Triceps", "exercises": [{ "name": "Barbell Bench Press", "sets": 4, "reps": "8" }, { "name": "Incline DB Press", "sets": 4, "reps": "10" }, { "name": "Weighted Dips", "sets": 3, "reps": "8" }, { "name": "Cable Tricep Pushdowns", "sets": 3, "reps": "12" }] },
      { "day": "Day 2: Back & Biceps", "exercises": [{ "name": "Barbell Rows", "sets": 4, "reps": "8" }, { "name": "Weighted Pullups", "sets": 4, "reps": "8" }, { "name": "Incline DB Curls", "sets": 3, "reps": "10" }, { "name": "Cable Rows", "sets": 3, "reps": "12" }] },
      { "day": "Day 3: Shoulders & Traps", "exercises": [{ "name": "Seated DB Shoulder Press", "sets": 4, "reps": "10" }, { "name": "Barbell Shrugs", "sets": 4, "reps": "10" }, { "name": "Lateral Raises", "sets": 4, "reps": "12" }, { "name": "Reverse Pec Dec", "sets": 3, "reps": "15" }] },
      { "day": "Day 4: Quads & Calves", "exercises": [{ "name": "Safety Bar Squats", "sets": 4, "reps": "8" }, { "name": "Leg Press", "sets": 4, "reps": "12" }, { "name": "Hack Squats", "sets": 3, "reps": "12" }, { "name": "Seated Calf Raises", "sets": 4, "reps": "15" }] },
      { "day": "Day 5: Hamstrings & Glutes", "exercises": [{ "name": "Sumo Deadlifts", "sets": 4, "reps": "6" }, { "name": "Stiff Leg Deadlifts", "sets": 4, "reps": "10" }, { "name": "Bulgarian Split Squats", "sets": 3, "reps": "12" }, { "name": "Hip Thrusts", "sets": 3, "reps": "12" }] }
    ]
  },
  "POWER": {
    "rookie": [
      { "day": "Day 1: Squat Intensity", "exercises": [{ "name": "Competition Squat", "sets": 5, "reps": "5 (75% 1RM)" }, { "name": "Leg Press", "sets": 3, "reps": "8" }, { "name": "Planks", "sets": 3, "reps": "60s" }] },
      { "day": "Day 2: Bench Intensity", "exercises": [{ "name": "Competition Bench Press", "sets": 5, "reps": "5 (75% 1RM)" }, { "name": "Dumbbell Rows", "sets": 4, "reps": "8" }, { "name": "Tricep Pushdowns", "sets": 3, "reps": "10" }] },
      { "day": "Day 3: Deadlift Intensity", "exercises": [{ "name": "Competition Deadlift", "sets": 5, "reps": "5 (75% 1RM)" }, { "name": "Romanian Deadlifts", "sets": 3, "reps": "8" }, { "name": "Lat Pulldowns", "sets": 3, "reps": "10" }] }
    ],
    "dedicated": [
      { "day": "Day 1: Squat Strength & Accs", "exercises": [{ "name": "Competition Squat", "sets": 5, "reps": "3 (82% 1RM)" }, { "name": "Pause Squat", "sets": 3, "reps": "4" }, { "name": "Bulgarian Split Squats", "sets": 3, "reps": "8" }, { "name": "Hanging Leg Raises", "sets": 3, "reps": "15" }] },
      { "day": "Day 2: Bench Press Strength", "exercises": [{ "name": "Competition Bench Press", "sets": 5, "reps": "3 (82% 1RM)" }, { "name": "Close Grip Bench Press", "sets": 3, "reps": "6" }, { "name": "Barbell Rows", "sets": 4, "reps": "8" }, { "name": "DB Overhead Press", "sets": 3, "reps": "10" }] },
      { "day": "Day 3: Deadlift & Pull Focus", "exercises": [{ "name": "Competition Deadlift", "sets": 5, "reps": "3 (82% 1RM)" }, { "name": "Deficit Deadlift", "sets": 3, "reps": "4" }, { "name": "Good Mornings", "sets": 3, "reps": "8" }, { "name": "Lat Pulldowns", "sets": 4, "reps": "10" }] },
      { "day": "Day 4: Overhead Press & Arms Accs", "exercises": [{ "name": "Military Press", "sets": 4, "reps": "6" }, { "name": "Dips", "sets": 4, "reps": "8" }, { "name": "Hammer Curls", "sets": 3, "reps": "10" }, { "name": "Facepulls", "sets": 4, "reps": "15" }] }
    ],
    "beast": [
      { "day": "Day 1: Squat Main Heavy", "exercises": [{ "name": "Competition Squat", "sets": 5, "reps": "2 (88% 1RM)" }, { "name": "Pin Squat", "sets": 3, "reps": "3" }, { "name": "Hack Squats", "sets": 3, "reps": "8" }, { "name": "Weighted Ab Planks", "sets": 3, "reps": "45s" }] },
      { "day": "Day 2: Bench Main Heavy", "exercises": [{ "name": "Competition Bench Press", "sets": 5, "reps": "2 (88% 1RM)" }, { "name": "Larsen Press", "sets": 3, "reps": "4" }, { "name": "Incline DB Press", "sets": 3, "reps": "8" }, { "name": "Chest Supported Rows", "sets": 4, "reps": "10" }] },
      { "day": "Day 3: Deadlift Main Heavy", "exercises": [{ "name": "Competition Deadlift", "sets": 5, "reps": "2 (88% 1RM)" }, { "name": "2-Board Block Pulls", "sets": 3, "reps": "3" }, { "name": "Barbell Shrugs", "sets": 3, "reps": "8" }, { "name": "Pullups", "sets": 4, "reps": "AMRAP" }] },
      { "day": "Day 4: Bench Technique & Delts", "exercises": [{ "name": "3-Sec Pause Bench Press", "sets": 4, "reps": "4 (70% 1RM)" }, { "name": "Spoto Press", "sets": 3, "reps": "4" }, { "name": "DB Lateral Raises", "sets": 4, "reps": "12" }, { "name": "Rear Delt Flyes", "sets": 4, "reps": "12" }] },
      { "day": "Day 5: Squat Speed & GPP", "exercises": [{ "name": "Speed Squats", "sets": 6, "reps": "2 (55% 1RM) explosive" }, { "name": "Walking Lunges", "sets": 3, "reps": "15 steps" }, { "name": "Kettlebell Swings", "sets": 4, "reps": "20" }, { "name": "Sled Drags", "sets": 4, "reps": "50m" }] }
    ]
  },
  "ATHLETIC": {
    "rookie": [
      { "day": "Day 1: Explosive Power", "exercises": [{ "name": "Barbell Power Clean", "sets": 4, "reps": "5" }, { "name": "Box Jumps", "sets": 4, "reps": "6" }, { "name": "Kettlebell Swings", "sets": 3, "reps": "15" }, { "name": "Medicine Ball Slams", "sets": 3, "reps": "10" }] },
      { "day": "Day 2: Unilateral Strength", "exercises": [{ "name": "Dumbbell Bulgarian Squats", "sets": 3, "reps": "10 each" }, { "name": "Single-Arm Dumbbell Rows", "sets": 3, "reps": "10" }, { "name": "Single-Leg RDLs", "sets": 3, "reps": "10 each" }, { "name": "Plank Rotations", "sets": 3, "reps": "12" }] },
      { "day": "Day 3: Conditioning Sprint", "exercises": [{ "name": "Sprints", "sets": 5, "reps": "60 meters" }, { "name": "Battling Ropes", "sets": 4, "reps": "30s work" }, { "name": "Farmer Walks", "sets": 3, "reps": "40 meters" }] }
    ],
    "dedicated": [
      { "day": "Day 1: Olympic Lift & Jumps", "exercises": [{ "name": "Hang Clean", "sets": 4, "reps": "4" }, { "name": "Depth Jumps", "sets": 4, "reps": "5" }, { "name": "Push Press", "sets": 4, "reps": "6" }, { "name": "Medicine Ball Chest Pass", "sets": 3, "reps": "8" }] },
      { "day": "Day 2: Tri-Planar Strength", "exercises": [{ "name": "Lateral Lunges", "sets": 3, "reps": "10 each" }, { "name": "Landmine Press & Rotation", "sets": 3, "reps": "10 each" }, { "name": "Seated Rows", "sets": 4, "reps": "8" }, { "name": "Farmer Walks", "sets": 3, "reps": "50 meters" }] },
      { "day": "Day 3: Rotational Power", "exercises": [{ "name": "Rotational Med Ball Slams", "sets": 4, "reps": "8 each" }, { "name": "Turkish Get-ups", "sets": 3, "reps": "3 each" }, { "name": "Single-Leg Box Squats", "sets": 3, "reps": "8 each" }, { "name": "Woodchoppers", "sets": 3, "reps": "12" }] },
      { "day": "Day 4: GPP Capacity", "exercises": [{ "name": "Airdyne Bike Sprints", "sets": 8, "reps": "20s sprint / 40s active" }, { "name": "Sled Push & Pull", "sets": 4, "reps": "30m" }, { "name": "Bear Crawls", "sets": 3, "reps": "30m" }, { "name": "Hanging Core Drills", "sets": 3, "reps": "15" }] }
    ],
    "beast": [
      { "day": "Day 1: Velocity Power Lift", "exercises": [{ "name": "Snatch High Pull", "sets": 4, "reps": "4" }, { "name": "Barbell Clean & Jerk", "sets": 4, "reps": "3" }, { "name": "Broad Jumps", "sets": 4, "reps": "5" }, { "name": "Kettlebell Goblet Jump Squat", "sets": 3, "reps": "8" }] },
      { "day": "Day 2: Heavy Chain & Carry", "exercises": [{ "name": "Trap Bar Deadlifts", "sets": 4, "reps": "6" }, { "name": "Heavy Overhead Walks", "sets": 3, "reps": "30m" }, { "name": "Weighted Pullups", "sets": 4, "reps": "6" }, { "name": "Plank Plate Drags", "sets": 3, "reps": "10" }] },
      { "day": "Day 3: Lateral & Agility Drill", "exercises": [{ "name": "Lateral Skater Bounds", "sets": 4, "reps": "10 each" }, { "name": "Medicine Ball Side Slams", "sets": 4, "reps": "8 each" }, { "name": "Dumbbell Step-ups", "sets": 3, "reps": "10 each" }, { "name": "Pallof Press", "sets": 3, "reps": "12" }] },
      { "day": "Day 4: Hardcore Conditioning", "exercises": [{ "name": "Rowing Machine Sprint", "sets": 6, "reps": "500m" }, { "name": "Sled Drag Sprints", "sets": 4, "reps": "40m" }, { "name": "Burpee Broad Jumps", "sets": 4, "reps": "10" }, { "name": "Double Unders", "sets": 4, "reps": "50" }] },
      { "day": "Day 5: Core Synergy & Mobility", "exercises": [{ "name": "Windmills", "sets": 3, "reps": "8 each" }, { "name": "Dead Bug", "sets": 3, "reps": "15" }, { "name": "Hanging Toes-To-Bar", "sets": 4, "reps": "12" }, { "name": "Kettlebell Halo", "sets": 3, "reps": "10 each" }] }
    ]
  }
}

# 1. Main Page Route
@app.route('/')
def home():
    return render_template('index.html')

# 2. API Endpoint: Macro Calculator
@app.route('/api/calculate-macros', methods=['POST'])
def calculate_macros():
    data = request.get_json() or {}
    try:
        weight = float(data.get('weight', 80))
        height = float(data.get('height', 180))
        age = int(data.get('age', 28))
        gender = data.get('gender', 'male')
        activity = float(data.get('activity', 1.55))
        goal = data.get('goal', 'maintain')
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid biometric values provided"}), 400

    # BMI Computation
    height_m = height / 100
    bmi = round(weight / (height_m * height_m), 1)
    
    if bmi < 18.5:
        bmi_status = 'Underweight'
    elif bmi < 25.0:
        bmi_status = 'Normal'
    elif bmi < 30.0:
        bmi_status = 'Overweight'
    else:
        bmi_status = 'Obese'

    # BMR Mifflin-St Jeor Formula
    if gender == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    # TDEE
    tdee = bmr * activity

    # Goal Adjustments
    calories = round(tdee)
    if goal == 'lose':
        calories -= 500
    elif goal == 'gain':
        calories += 500

    # Macronutrients calculations
    # Protein: 2.2g per kg of weight
    protein_g = round(weight * 2.2)
    protein_kcal = protein_g * 4

    # Fat: 25% of energy target
    fat_kcal = calories * 0.25
    fat_g = round(fat_kcal / 9)

    # Carbs: Remainder of energy
    carb_kcal = calories - (protein_kcal + fat_kcal)
    carb_g = round(max(0, carb_kcal) / 4)

    return jsonify({
        "bmi": bmi,
        "bmiStatus": bmi_status,
        "calories": calories,
        "protein": protein_g,
        "carbs": carb_g,
        "fat": fat_g
    })

# 3. API Endpoint: Get Workout Split
@app.route('/api/workout-plan', methods=['POST'])
def get_workout_plan():
    data = request.get_json() or {}
    goal = data.get('goal', 'SHRED').upper()
    frequency = data.get('frequency', 'dedicated').lower()

    if goal not in WORKOUT_PLANS:
        goal = 'SHRED'
    if frequency not in ['rookie', 'dedicated', 'beast']:
        frequency = 'dedicated'

    plan = WORKOUT_PLANS[goal].get(frequency, [])
    return jsonify({"plan": plan})

# 4. API Endpoint: Class Scheduler Booking
@app.route('/api/book-class', methods=['POST'])
def book_class():
    data = request.get_json() or {}
    day = data.get('day', '').upper()
    class_id = data.get('classId', '')

    if day not in CLASS_DATABASE:
        return jsonify({"error": f"Invalid day: {day}"}), 400

    # Locate class in data store
    target_class = None
    for cls in CLASS_DATABASE[day]:
        if cls['id'] == class_id:
            target_class = cls
            break

    if not target_class:
        return jsonify({"error": "Class session not found"}), 404

    # Verify slots availability
    if target_class['booked'] >= target_class['capacity']:
        return jsonify({"error": "This session is fully booked!"}), 400

    # Book slot
    target_class['booked'] += 1
    
    return jsonify({
        "success": True,
        "message": f"Successfully registered slot in {target_class['name']}",
        "class": target_class
    })

# 5. Fetch Calendar Classes list API
@app.route('/api/classes', methods=['GET'])
def get_classes():
    return jsonify(CLASS_DATABASE)

if __name__ == '__main__':
    print("DO HARD Gym server launching at http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
