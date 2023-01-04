import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ShowListButton from './ShowListButton.svelte';

it('set and update prop', async () => {
	const eventMock = vi.fn((event) => (extended = event.detail));
	const user = userEvent.setup();

	let extended = false;

	//@ts-ignore
	const { component } = render(ShowListButton);
	const button = screen.getByRole('button');

	component.$on('click', eventMock);

	expect(screen.queryByText('Show list')).not.toBeInTheDocument();
	await user.click(button);
	expect(eventMock).toHaveBeenCalled();
	expect(extended).toBe(true);

	expect(screen.queryByText('Show list')).toBeInTheDocument();
	await user.click(button);
	expect(eventMock).toHaveBeenCalled();
	expect(extended).toBe(false);
});
