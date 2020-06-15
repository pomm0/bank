import React from 'react';
import { render } from '@testing-library/react';
import { FormGroup } from 'components';

describe('Intial', () => {
  it('It renders children', () => {
    const { queryByTestId } = render(
      <FormGroup>
        <div data-testid="my-child"></div>
      </FormGroup>
    );

    expect(queryByTestId('my-child')).toBeTruthy();
  });

  it('It renders label', () => {
    const { queryByTestId } = render(<FormGroup label="myLabel" />);

    expect(queryByTestId('form-group-label').textContent).toEqual('myLabel');
  });

  it('It renders error message', () => {
    const { queryByTestId } = render(<FormGroup errorMessage="myError" />);

    expect(queryByTestId('form-group-error-message').textContent).toEqual('myError');
  });

  it('It allows extra classNames', () => {
    const { queryByTestId } = render(<FormGroup className="my-extra-class" />);

    expect(queryByTestId('form-group').classList.contains('my-extra-class')).toBeTruthy();
  });
});
