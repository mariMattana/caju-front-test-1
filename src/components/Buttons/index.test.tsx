import Button from '.';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

describe('Button', () => {
  it('Should show button', () => {
    const { debug } = render(<Button>Ativar</Button>);
    expect(screen.getByRole('button', { name: /ativar/i }));
    debug();
  });
});
