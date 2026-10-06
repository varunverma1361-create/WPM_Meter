const express = require("express");
const router = express.Router();

const TestResult = require("../models/TestResult.js");

const auth = require("../middleware/auth.js");

router.post("/", auth,async(req,res)=>{
    try{
        const userWpm = req.body.wpm;
        const userAccuracy = req.body.accuracy;
        const userTimeTaken = req.body.timeTaken;

        const userTestResult = new TestResult({
            userId: req.userId,
            wpm: userWpm,
            accuracy: userAccuracy,
            timeTaken: userTimeTaken
        })

        await userTestResult.save();

        return res.json({
            message: "Test result saved"
        })
    } catch(error){
        return res.status(500).json({
            message: "Error saving the test result"
        })
    }
})

router.get("/", auth, async (req,res)=>{

    try{
            const testResults = await TestResult.find({
            userId: req.userId
        })

        return res.json({
            testResults
        });

    }catch(error){
        res.status(500).json({
            message: "Error fetching the test results"
        });
    }
});

router.get("/stats", auth, async (req,res)=>{

    try{
        const userTestResults = await TestResult.find({
            userId: req.userId
        })

        const userTotalTests = userTestResults.length;
        let userBestWpm = 0;
        let userWpmSum = 0;
        let userAccuracySum = 0;
        
        for(let i = 0; i < userTestResults.length ; i++){
            userBestWpm = Math.max(userBestWpm, userTestResults[i].wpm);
            userWpmSum += userTestResults[i].wpm;
            userAccuracySum += userTestResults[i].accuracy;
        }
        
        const userAverageWpm = userWpmSum/userTestResults.length;
        const userAverageAccuracy = userAccuracySum/userTestResults.length;

        res.json({
            totalTests: userTotalTests,
            bestWpm: userBestWpm,
            averageWpm: userAverageWpm,
            averageAccuracy: userAverageAccuracy
        })

    } catch(error){
        return res.status(500).json({
            message: "Error in retrieving stats"
        })
    }
})

module.exports = router;