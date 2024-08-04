import "./index.css"
import Button from "../../../components/Button"


export default function Footer({ goToFeedClick, goToWorkoutClick, goToAchievementClick }) {


    const handleGoToFeedClick = () => goToFeedClick()
    const handleGoToWorkoutClick = () => goToWorkoutClick()
    const handleGoToAchievementClick = () => goToAchievementClick()

    return <footer className="Footer">
        <Button onClick={handleGoToFeedClick} className="FooterButton">
            <i className="fa fa-house"></i>
        </Button>
        <Button onClick={handleGoToWorkoutClick} className="FooterButton">
            <i className="fa fa-dumbbell"></i>
        </Button>
        <Button onClick={handleGoToAchievementClick} className="FooterButton">
            <i className="fa fa-ranking-star"></i>
        </Button>
    </footer>

}

