import React from 'react'
import FullGoal from '../../images/CompleteGoalImage.png'
import UnFullGoal from '../../images/UnCompleteGoalImage.png'
import './GoalsComponent.css'

const  GoalsComponent = ({balanceAmount, goalName ,goalDate, goalTarget }) => {

    var classPercent = "" ;
    var imageGoal = ""
    var textPercent = ""
    var currentPercentGoal =  ((balanceAmount / goalTarget) *100).toFixed(1) ;

    
    if (balanceAmount >= goalTarget){
        classPercent="goalPartTwoOptionComplete";
        imageGoal = FullGoal; 
        textPercent = "Done!";
        currentPercentGoal = 100;
    }
    else{
        classPercent="goalPartTwoOptionUnComplete";
        imageGoal = UnFullGoal;
        textPercent ="In Progress";
    }

 

console.log(goalDate, goalName);

    return (
        <div className="goalComponentMain">

            <div className="goalPartOne">
                <div className="goalNameAndImage">
                    <div className="goalName">{goalName}</div>
                    <div className="goalImage"><img src={imageGoal}></img></div>
                </div>
                <div className="goalDate">
                    <h4>{(new Date(goalDate)).toISOString().split('T')[0]}</h4>
                </div>
            </div>

            <div className={classPercent}>
                <div><h2>{currentPercentGoal}%</h2></div> 
                <div><h2>{textPercent}</h2></div>
            </div>

        </div>
    )
}

export default GoalsComponent