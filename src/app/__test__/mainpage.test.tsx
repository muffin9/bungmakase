import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '@/components/common/Header';

describe('<Header />', () => {
  it('Header 컴포넌트 렌더링 확인', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner'); // header 요소
    expect(headerElement).toBeInTheDocument();
  });
});
