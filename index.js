import express from 'express';
import todo from './data.json' assert{type: "json"};

import bodyParser from 'body-parser';

const app = express();
const Port = 3000;
app.use(bodyParser.json());

// Get all todo
app.get('/todo', (req, res) => {
    if (todo) {
        res.status(200).json(todo);
        console.log(todo);
    } else {
        res.status(404).send('Not Found');
    }
});

//post a todo
app.post('/todo', (req, res) => {
    const { id, title, completed } = req.body;
    const idExists = todo.some(todoItem => todoItem.id === id);
    if (idExists) {
        return res.status(400).json({ message: 'ID must be unique' });
    }
    const newTodo = { id, title, completed };
    todo.push(newTodo);
    res.status(201).json(todo);
});
//updating a todo with a title
app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const {title, completed } = req.body;
    let updatedTitle=false;
    let updatedCompleted=false;
    for(let i=0;i<todo.length;i++){
        if(todo[i].id===parseInt(id)){
            if(title){
                updatedTitle=true;
                todo[i].title=title;
            }
            if(completed!==undefined){
                updatedCompleted=true;
                todo[i].completed=completed;    
            }
            }
      
    if(!updatedTitle && !updatedCompleted )  
      return res.status(400).json({message:"Bad request"}) 
    else
      return res.status(200).json(todo[i])
}});

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todo.findIndex(todoItem => todoItem.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    const deletedTodo = todo.splice(todoIndex, 1);
    res.status(200).json(deletedTodo);
});

app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
});
