function ItemTodo({job, index, onClick}) {
    return (
          <div className="Todo">
            <p>{job}</p>
            <button onClick={() => onClick(index)} className='delete'>Delete</button>
          </div>
      )
}

export default ItemTodo