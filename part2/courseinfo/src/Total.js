const Total = ({ parts }) => (
    <b>total of {parts.reduce((prev, cur) => (prev + cur.exercises), 0)} exercises</b>
)
export default Total
