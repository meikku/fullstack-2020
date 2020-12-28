import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM, getByText } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
    const user = {
        username: 'Jani',
        name: 'jani'
    }
    const blog = {
        title: 'Oh what fun it is to test',
        author: 'Santa',
        url: 'http://santastests.com',
        likes: '1',
        user: user
    } 
    const component = render(
        <Blog blog={blog} user={user}/> 
    )

    expect(component.container).toHaveTextContent(
        'Oh what fun it is to test', 'Santa'
    )
}) 
   
test('renders only title and author', () => {
    const user = {
        username: 'Jani',
        name: 'jani'
    }
    const blog = {
        title: 'Oh what fun it is to test',
        author: 'Santa',
        url: 'http://santastests.com',
        likes: '1',
        user: user
    } 
    const component = render(
        <Blog blog={blog} user={user}/> 
    )
    //component.debug()

    const div = component.container.querySelector('.blogBasics')
    expect(div).toHaveTextContent(
        'Oh what fun it is to test', 'Santa'
    )
    expect(div).not.toHaveTextContent(
        'http://santastests.com, 1'
    )
})
test('renders blog details', () => {
    const user = {
        username: 'Jani',
        name: 'jani'
    }
    const blog = {
        title: 'Oh what fun it is to test',
        author: 'Santa',
        url: 'http://santastests.com',
        likes: '1',
        user: user
    } 
    const component = render(
        <Blog blog={blog} user={user}/> 
    )
    // component.debug()

    const div2 = component.container.querySelector('.blogsInDetail')
    expect(div2).toHaveTextContent(
        'Oh what fun it is to test',
        'Santa',
        'http://santastests.com',
        '1',
    )
})
test('clicking the button calls event handler once', () => {
    const user = {
        username: 'Jani',
        name: 'jani'
    }
    const blog = {
        title: 'Oh what fun it is to test',
        author: 'Santa',
        url: 'http://santastests.com',
        likes: '1',
        user: user
    } 
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} handleLikes={mockHandler} changeLikes={mockHandler}/>
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
