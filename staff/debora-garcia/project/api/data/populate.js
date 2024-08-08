import "dotenv/config"
import mongoose from "mongoose"
import { Workout } from "./index.js"
import { Movement } from "./index.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        // EMOM 1: 10 Minutos
        const burpees = new Movement({
            name: "Burpees",
            quantity: 10,
        })
        const kettlebellSwing = new Movement({
            name: "Kettlebell Swings",
            weight: 16,
            quantity: 12,
            units: "kg"
        })
        const airSquats = new Movement({
            name: "Air Squats",
            quantity: 15,
        })
        const boxJumps = new Movement({
            name: "Box Jumps",
            quantity: 10,
        })

        // EMOM 2: 15 Minutos
        const thrusters = new Movement({
            name: "Thrusters",
            weight: 95,
            quantity: 10,
            units: "kg"
        })
        const pushUps = new Movement({
            name: "Push ups",
            quantity: 15,
        })
        const pullUps = new Movement({
            name: "Pull ups",
            quantity: 10,
        })
        const walkingLunges = new Movement({
            name: "Walking Lunges",
            quantity: 20,
        })

        // EMOM 3: 20 Minutos
        const snatch = new Movement({
            name: "Snatch",
            weight: 35,
            quantity: 6,
            units: "kg"
        })
        const kettlebellSwing2 = new Movement({
            name: "Kettlebell Swings",
            weight: 20,
            quantity: 15,
            units: "kg"
        })
        const boxJumps2 = new Movement({
            name: "Box Jumps",
            quantity: 10,
        })
        const sitUps = new Movement({
            name: "Sit ups",
            quantity: 20,
        })

        // EMOM 4: 30 Minutos
        const cleanAndJerks = new Movement({
            name: "Clean and Jerks",
            weight: 40,
            quantity: 10,
            units: "kg"
        })
        const pullUps2 = new Movement({
            name: "Pull ups",
            quantity: 15,
        })
        const wallBalls = new Movement({
            name: "Wall Balls",
            weight: 6,
            quantity: 20,
            units: "kg"
        })
        const airSquats2 = new Movement({
            name: "Air Squats",
            quantity: 25,
        })
        const doubleUnders = new Movement({
            name: "Double Unders",
            quantity: 30,
        })

        // AMRAP 1: 10 Minutos
        const burpees2 = new Movement({
            name: "Burpees",
            quantity: 5,
        })
        const kettlebellSwing3 = new Movement({
            name: "Kettlebell Swings",
            weight: 16,
            quantity: 10,
            units: "kg"
        })
        const airSquats3 = new Movement({
            name: "Air Squats",
            quantity: 15,
        })

        // AMRAP 2: 15 Minutos
        const pushUps2 = new Movement({
            name: "Push ups",
            quantity: 10,
        })
        const boxJumps3 = new Movement({
            name: "Box Jumps",
            quantity: 15,
        })
        const sitUps2 = new Movement({
            name: "Sit ups",
            quantity: 20,
        })

        // AMRAP 3: 20 Minutos
        const thrusters2 = new Movement({
            name: "Thrusters",
            weight: 20,
            quantity: 12,
            units: "kg"
        })
        const pullUps3 = new Movement({
            name: "Pull ups",
            quantity: 15,
        })
        const walkingLunges2 = new Movement({
            name: "Walking Lunges",
            quantity: 18,
        })
        const doubleUnders2 = new Movement({
            name: "Double Unders",
            quantity: 21,
        })

        // AMRAP 4: 30 Minutos
        const deadlifts = new Movement({
            name: "Deadlifts",
            quantity: 15,
            units: "kg"
        })
        const wallBalls2 = new Movement({
            name: "Wall Balls",
            weight: 6,
            quantity: 20,
            units: "kg"
        })
        const pushPress = new Movement({
            name: "Push Press",
            quantity: 25,
        })
        const sitUps3 = new Movement({
            name: "Sit ups",
            quantity: 30,
        })

        // For Time 1: Sprint Chipper
        const doubleUnders3 = new Movement({
            name: "Double Unders",
            quantity: 50,
        })
        const sitUps4 = new Movement({
            name: "Sit ups",
            quantity: 40,
        })
        const boxJumps4 = new Movement({
            name: "Box Jumps",
            quantity: 30,
        })
        const kettlebellSwing4 = new Movement({
            name: "Kettlebell Swings",
            weight: 16,
            quantity: 20,
            units: "kg"
        })
        const burpees3 = new Movement({
            name: "Burpees",
            quantity: 10,
        })

        // For Time 2: Leg Burner
        const run800m = new Movement({
            name: "Run",
            quantity: 800,
            units: "meters"
        })
        const airSquats4 = new Movement({
            name: "Air Squats",
            quantity: 50,
        })
        const run400m = new Movement({
            name: "Run",
            quantity: 400,
            units: "meters"
        })
        const walkingLunges3 = new Movement({
            name: "Walking Lunges",
            quantity: 50,
        })
        const run200m = new Movement({
            name: "Run",
            quantity: 200,
            units: "meters"
        })

        // For Time 3: Upper Body Blast
        const pushUps3 = new Movement({
            name: "Push ups",
            quantity: 30,
        })
        const pullUps4 = new Movement({
            name: "Pull ups",
            quantity: 20,
        })
        const shoulderPress = new Movement({
            name: "Shoulder Press",
            quantity: 30,
        })
        const ringDips = new Movement({
            name: "Ring dips",
            quantity: 20,
        })

        // For Time 4: Full Body Burner
        const rowing500m = new Movement({
            name: "Rowing",
            quantity: 500,
            units: "meters"
        })
        const wallBalls3 = new Movement({
            name: "Wall Balls",
            weight: 6,
            quantity: 40,
            units: "kg"
        })
        const burpees4 = new Movement({
            name: "Burpees",
            quantity: 30,
        })
        const thrusters3 = new Movement({
            name: "Thrusters",
            weight: 30,
            quantity: 20,
            units: "kg"
        })
        const pullUps5 = new Movement({
            name: "Pull ups",
            quantity: 10,
        })

        // Benchmark 1: Angie
        const pullUps6 = new Movement({
            name: "Pull ups",
            quantity: 100,
        })
        const pushUps4 = new Movement({
            name: "Push ups",
            quantity: 100,
        })
        const sitUps5 = new Movement({
            name: "Sit ups",
            quantity: 100,
        })
        const airSquats5 = new Movement({
            name: "Air Squats",
            quantity: 100,
        })

        // Benchmark 2: Grace
        const cleanAndJerks2 = new Movement({
            name: "Clean and Jerks",
            weight: 43,
            quantity: 30,
            units: "kg"
        })

        // Benchmark 3: Jackie
        const rowing1000m = new Movement({
            name: "Rowing",
            quantity: 1000,
            units: "meters"
        })
        const thrusters4 = new Movement({
            name: "Thrusters",
            weight: 18,
            quantity: 50,
            units: "kg"
        })
        const pullUps7 = new Movement({
            name: "Pull ups",
            quantity: 30,
        })

        // Benchmark 4: Diane
        const deadlifts2 = new Movement({
            name: "Deadlifts",
            weight: 70,
            quantity: 21,
            units: "kg"
        })
        const hspu = new Movement({
            name: "HSPU",
            quantity: 21,
        })
        const deadlifts3 = new Movement({
            name: "Deadlifts",
            weight: 70,
            quantity: 15,
            units: "kg"
        })
        const hspu2 = new Movement({
            name: "HSPU",
            quantity: 15,
        })
        const deadlifts4 = new Movement({
            name: "Deadlifts",
            weight: 70,
            quantity: 9,
            units: "kg"
        })
        const hspu3 = new Movement({
            name: "HSPU",
            quantity: 9,
        })
        const rest = new Movement({
            name: "Rest",
            quantity: 1,
            units: "minute"
        })

        return Promise.all([
            burpees.save(),
            kettlebellSwing.save(),
            airSquats.save(),
            boxJumps.save(),

            thrusters.save(),
            pushUps.save(),
            pullUps.save(),
            walkingLunges.save(),

            snatch.save(),
            kettlebellSwing2.save(),
            boxJumps2.save(),
            sitUps.save(),

            cleanAndJerks.save(),
            pullUps2.save(),
            wallBalls.save(),
            airSquats2.save(),
            doubleUnders.save(),

            burpees2.save(),
            kettlebellSwing3.save(),
            airSquats3.save(),

            pushUps2.save(),
            boxJumps3.save(),
            sitUps2.save(),

            thrusters2.save(),
            pullUps3.save(),
            walkingLunges2.save(),
            doubleUnders2.save(),

            deadlifts.save(),
            wallBalls2.save(),
            pushPress.save(),
            sitUps3.save(),

            doubleUnders3.save(),
            sitUps4.save(),
            boxJumps4.save(),
            kettlebellSwing4.save(),
            burpees3.save(),

            run800m.save(),
            airSquats4.save(),
            run400m.save(),
            walkingLunges3.save(),
            run200m.save(),

            pushUps3.save(),
            pullUps4.save(),
            shoulderPress.save(),
            ringDips.save(),

            rowing500m.save(),
            wallBalls3.save(),
            burpees4.save(),
            thrusters3.save(),
            pullUps5.save(),

            pullUps6.save(),
            pushUps4.save(),
            sitUps5.save(),
            airSquats5.save(),

            cleanAndJerks2.save(),

            rowing1000m.save(),
            thrusters4.save(),
            pullUps7.save(),

            deadlifts2.save(),
            hspu.save(),
            deadlifts3.save(),
            hspu2.save(),
            deadlifts4.save(),
            hspu3.save(),

            rest.save()
        ])

            .then(([
                burpees, kettlebellSwing, airSquats, boxJumps, thrusters, pushUps, pullUps, walkingLunges,
                snatch, kettlebellSwing2, boxJumps2, airSquats2, sitUps, cleanAndJerks, pullUps2, wallBalls, doubleUnders,
                burpees2, kettlebellSwing3, airSquats3, pushUps2, boxJumps3, sitUps2, thrusters2, pullUps3, walkingLunges2,
                doubleUnders2, deadlifts, wallBalls2, pushPress, sitUps3, doubleUnders3, sitUps4, boxJumps4, kettlebellSwing4,
                burpees3, run800m, airSquats4, run400m, walkingLunges3, run200m, pushUps3, pullUps4, shoulderPress, ringDips,
                rowing500m, wallBalls3, burpees4, thrusters3, pullUps5, pullUps6, pushUps4, sitUps5, airSquats5, cleanAndJerks2,
                rowing1000m, thrusters4, pullUps7, deadlifts2, hspu, deadlifts3, hspu2, deadlifts4, hspu3, rest
            ]) => {
                const wodEmom1 = new Workout({
                    workoutType: "emom",
                    movements: [burpees._id, kettlebellSwing._id, airSquats._id, boxJumps._id, rest._id],
                    duration: 10,
                })
                const wodEmom2 = new Workout({
                    workoutType: "emom",
                    movements: [thrusters._id, pushUps._id, pullUps._id, walkingLunges._id, rest._id],
                    duration: 15,
                })
                const wodEmom3 = new Workout({
                    workoutType: "emom",
                    movements: [snatch._id, kettlebellSwing2._id, boxJumps2._id, airSquats2._id, sitUps._id, rest._id],
                    duration: 20,
                })
                const wodEmom4 = new Workout({
                    workoutType: "emom",
                    movements: [cleanAndJerks._id, pullUps2._id, wallBalls._id, airSquats2._id, doubleUnders._id, rest._id],
                    duration: 30,
                })
                const wodAmrap1 = new Workout({
                    workoutType: "amrap",
                    movements: [burpees2._id, kettlebellSwing3._id, airSquats3._id],
                    duration: 10,
                })
                const wodAmrap2 = new Workout({
                    workoutType: "amrap",
                    movements: [pushUps2._id, boxJumps3._id, sitUps2._id],
                    duration: 15,
                })
                const wodAmrap3 = new Workout({
                    workoutType: "amrap",
                    movements: [thrusters2._id, pullUps3._id, walkingLunges2._id, doubleUnders2._id],
                    duration: 20,
                })
                const wodAmrap4 = new Workout({
                    workoutType: "amrap",
                    movements: [deadlifts._id, wallBalls2._id, pushPress._id, sitUps3._id],
                    duration: 30,
                })
                const wodForTime1 = new Workout({
                    workoutType: "for-time",
                    movements: [doubleUnders3._id, sitUps4._id, boxJumps4._id, kettlebellSwing4._id, burpees3._id],
                    duration: 10,
                })
                const wodForTime2 = new Workout({
                    workoutType: "for-time",
                    movements: [run800m._id, airSquats4._id, run400m._id, walkingLunges3._id, run200m._id],
                    duration: 15,
                })
                const wodForTime3 = new Workout({
                    workoutType: "for-time",
                    movements: [pushUps3._id, pullUps4._id, shoulderPress._id, ringDips._id],
                    duration: 12,
                })
                const wodForTime4 = new Workout({
                    workoutType: "for-time",
                    movements: [rowing500m._id, wallBalls3._id, burpees4._id, thrusters3._id, pullUps5._id],
                    duration: 20,
                })
                const benchmark1 = new Workout({
                    workoutType: "benchmark",
                    title: "Angie",
                    movements: [pullUps6._id, pushUps4._id, sitUps5._id, airSquats5._id]
                })
                const benchmark2 = new Workout({
                    workoutType: "benchmark",
                    title: "Grace",
                    movements: [cleanAndJerks2._id]
                })
                const benchmark3 = new Workout({
                    workoutType: "benchmark",
                    title: "Jackie",
                    movements: [rowing1000m._id, thrusters4._id, pullUps7._id]
                })
                const benchmark4 = new Workout({
                    workoutType: "benchmark",
                    title: "Diane",
                    movements: [deadlifts2._id, hspu._id, deadlifts3._id, hspu2._id, deadlifts4._id, hspu3._id]
                })
                const workoutPromises = [  wodEmom1.save(),
                    wodEmom2.save(),
                    wodEmom3.save(),
                    wodEmom4.save(),
                    wodAmrap1.save(),
                    wodAmrap2.save(),
                    wodAmrap3.save(),
                    wodAmrap4.save(),
                    wodForTime1.save(),
                    wodForTime2.save(),
                    wodForTime3.save(),
                    wodForTime4.save(),
                    benchmark1.save(),
                    benchmark2.save(),
                    benchmark3.save(),
                    benchmark4.save()]

                return Promise.all(workoutPromises)
               
            }).then(() => console.log("Workout and movements inserted successfully"))

    })
    .catch(error => console.error(error))


/* const movements = {

    burpees: new Movement({ name: "Burpees",  quantity: 10,  }),
    kettlebellSwing: new Movement({ name: "Kettlebell Swings", weight: 16, quantity: 12, units: "kg" }),
    airSquats: new Movement({ name: "Air Squats",  quantity: 15,  }),
    boxJumps: new Movement({ name: "Box Jumps",  quantity: 10,  }),
 
const saveMovements = Object.values(movements).map(movement => movement.save())

    return Promise.all(saveMovements)
        .then(savedMovements => {
            const [
                burpees, kettlebellSwing, airSquats, boxJumps, 
            ] = savedMovements
            
        const workouts = [
            new Workout({
                workoutType: "emom",
                movements: [burpees._id, kettlebellSwing._id, airSquats._id, boxJumps._id],
                duration: 10,
            })
            new Workout({
                workoutType: "benchmark",
                title: "Grace"
                movements: [burpees._id, kettlebellSwing._id, airSquats._id, boxJumps._id],
                duration: 10,
                
            })
                return Promise.all(workouts.map(workout => workout.save()))

*/
