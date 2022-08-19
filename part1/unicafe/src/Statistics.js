const StatisticLine = ({text, value}) => <tr><td>{text} {value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good - bad) / all; 
    const positivePercentage = (good / all) * 100;

    return(
        (good === 0 && neutral === 0 && bad ===0 )
        ? <div>No feedback given</div>
        : (
            <table>
            <tbody>
                <StatisticLine text="good" value ={good} />
                <StatisticLine text="neutral" value ={neutral} />
                <StatisticLine text="bad" value ={bad} />
                <StatisticLine text="all" value ={all} />
                <StatisticLine text="average" value ={average} />
                <StatisticLine text="positive" value ={`${positivePercentage} %`} />
            </tbody> 
            </table>
        )
    )
}

export default Statistics
