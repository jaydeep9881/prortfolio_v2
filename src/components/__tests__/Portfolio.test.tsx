import { render, screen } from '@testing-library/react';
import GTABackground from '../GTABackground';
import Experience from '../../sections/Experience';
import { ThemeProvider } from '../../context/ThemeContext';

describe('GTA VI Vice Ocean Portfolio', () => {
  it('renders GTABackground with the Grand Theft Auto 6 image', () => {
    render(
      <ThemeProvider>
        <GTABackground />
      </ThemeProvider>
    );
    const bgImage = screen.getByAltText(/GTA VI Vice City Skyline & Ocean/i);
    expect(bgImage).toBeInTheDocument();
    expect(bgImage).toHaveAttribute('src', '/Grand Theft Auto 6.jpg');
  });

  it('renders Experience section with correct spelling', () => {
    render(<Experience />);
    expect(screen.getByText(/Professional/i)).toBeInTheDocument();
    expect(screen.getByText(/Bizmo Technologies/i)).toBeInTheDocument();
    // Verify typo fix: "Assisted" is present
    expect(screen.getByText(/Assisted in the architectural development/i)).toBeInTheDocument();
  });
});
