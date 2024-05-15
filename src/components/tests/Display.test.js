import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow')


const testShow = {
    //add in approprate test data structure here.
    name: 'Test 0',
    summary: 'testing the summary text',
    seasons: [
        {
            id: 0,
            name: 'season 0',
            episodes: [],
        },
        {
            id: 1,
            name: 'season 1',
            episodes: [],
        },
        {
            id: 2,
            name: 'season 2',
            episodes: [],
        },
        {
            id: 3,
            name: 'season 3',
            episodes: [],
        },

    ],
}

jest.mock('../../api/fetchShow')

test('renders without errors', () => {
    render(<Display/>)
})

test('when the fetch button is pressed, the show component will display', async () => {
    fetchShow.mockResolvedValueOnce(testShow)

    //1. ARRANGE
    render(<Display/>)

    //2. ACT
    const button = screen.getByRole('button')
    userEvent.click(button)

    //3. ASSERT
    const shows = await screen.findByTestId('show-container')
    expect(shows).toBeInTheDocument()

})

test('when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in data', async () => {
    fetchShow.mockResolvedValueOnce(testShow)

    //1. ARRANGE
    render(<Display/>)

    //2. ACT
    const button = screen.getByRole('button')
    userEvent.click(button)

    //3. ASSERT
    const seasonOptions = await screen.findAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(4)

})

test('Test that when the fetch button is pressed, the displayFunc function is called', async () => {
    fetchShow.mockResolvedValueOnce(testShow)
    const displayFunc = jest.fn()

    //1. ARRANGE
    render(<Display displayFunc={displayFunc}/>)

    //2. ACT
    const button = screen.getByRole('button')
    userEvent.click(button)

    //3. ASSERT
    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled()
    })

})



///Tasks:
//1. Add in nessisary imports and values to establish the testing suite. x
//2. Test that the Display component renders without any passed in props. x
//3. Rebuild or copy a show test data element as used in the previous set of tests. x
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.x
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.x
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.