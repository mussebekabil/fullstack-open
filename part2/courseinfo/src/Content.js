import Part from "./Part";

const Content = ({ parts }) => (
    <div>
        {parts.map(({  name, exercises }, i) => (
            <Part key={`name-${i}`} part={name} exercises={exercises} />
        ))}
    </div> 
);

export default Content
