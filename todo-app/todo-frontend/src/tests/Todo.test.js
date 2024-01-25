import { render, screen } from '@testing-library/react';
import Todo from '../Todos/Todo';

it('renders todo text', () => {
    const todo = { text: 'Testing testing', done: 'False' };
    const deleteTodo = jest.fn();
    const completeTodo = jest.fn()

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>);

    expect(screen.getByText('Testing testing')).toBeInTheDocument();
});