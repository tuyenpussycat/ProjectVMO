import { describe, expect, it, vi } from 'vitest';
import { OrderList } from '..';
import { render, screen } from '../../../utils/test-utils';

vi.mock('../orders.queries.ts');

describe('OrderList', () => {
  it('should render heading', () => {
    render(<OrderList />);
    expect(screen.getByRole('heading', { name: /Orders/i })).toBeInTheDocument();
  });

  it('should render the list', async () => {
    render(<OrderList />);
    const row = await screen.findByRole('link', { name: /1234/i });
    expect(row).toBeInTheDocument();
  });
});
