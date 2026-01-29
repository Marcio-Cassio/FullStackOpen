const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return(
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Total = ({ totalExercises }) => <p><strong>Total of {totalExercises} exercises</strong></p>

const Header = ({ courseName }) => <h1>{courseName}</h1>

const Course = ({ course }) => {

  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <Header courseName={course.name} />

      <Content parts={course.parts} />

      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default Course