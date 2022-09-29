
const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <ul style={{ listStyleType: "none" }}><li><b>total of exercises {sum}</b></li></ul>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        <ul style={{ listStyleType: "none" }}>
            {parts.map(part =>
                <li key={part.id}>
                    <Part part={part} />
                </li>
            )
            }
        </ul>
    </>

const Course = ({ courses }) =>
    <>
        {courses.map(course =>
            <>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total sum={course.parts.reduce((amount, part) => amount + part.exercises, 0)} />
            </>
        )
        }
    </>

export default Course