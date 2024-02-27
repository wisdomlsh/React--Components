import { render, fireEvent } from '@testing-library/react';
import Test from './Test';

test('test', () => {

  const { container } = render(<Test />)

  expect(container.querySelector('p')?.textContent).toBe('close')

  fireEvent.click(container.querySelector('button')!)

  expect(container.querySelector('p')?.textContent).toBe('open')

})