import { describe, expect, it, vi } from 'vitest';
import { OrderDetails } from '..';
import { render, screen, userEvent } from '../../../utils/test-utils';

vi.mock('../orders.queries.ts');
vi.mock('../orders.mutation.ts');

describe('OrderDetails', () => {
  it('should render heading', async () => {
    render(<OrderDetails />);
    const heading = await screen.findByRole('heading', { name: /1234/i });
    expect(heading).toBeInTheDocument();
  });

  it('shouble be able to cancel order', async () => {
    render(<OrderDetails />);
    const cancelButton = await screen.findByRole('button', { name: /Cancel order/i });
    userEvent.click(cancelButton);

    const confirmCancel = await screen.findByRole('button', { name: /Confirm/i });
    userEvent.click(confirmCancel);

    const cancelledBadge = await screen.findByText(/ONE_STAR/);
    expect(cancelledBadge).toBeInTheDocument();
  });
});
