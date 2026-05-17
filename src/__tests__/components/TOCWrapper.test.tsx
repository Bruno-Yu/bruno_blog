import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TOCWrapper from '../../theme/TOC/index';

// Helper: set jsdom scroll properties which are read-only by default
function setScrollProps({
  scrollY = 0,
  bodyScrollHeight = 1000,
  innerHeight = 1000,
}: {
  scrollY?: number;
  bodyScrollHeight?: number;
  innerHeight?: number;
}) {
  Object.defineProperty(window, 'scrollY', { value: scrollY, writable: true, configurable: true });
  Object.defineProperty(document.body, 'scrollHeight', {
    value: bodyScrollHeight,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, 'innerHeight', {
    value: innerHeight,
    writable: true,
    configurable: true,
  });
}

// TOCWrapper requires a tocTree prop (from Docusaurus WrapperProps)
const defaultProps = { tocTree: [] };

describe('TOCWrapper', () => {
  beforeEach(() => {
    // Reset to a state where no scrolling is possible
    setScrollProps({ scrollY: 0, bodyScrollHeight: 1000, innerHeight: 1000 });
  });

  it('shows 0% progress on initial render (scrollY = 0)', () => {
    setScrollProps({ scrollY: 0, bodyScrollHeight: 2000, innerHeight: 1000 });
    const { container } = render(<TOCWrapper {...defaultProps} />);

    const progressBar = container.querySelector('[aria-hidden="true"] > div') as HTMLElement;
    expect(progressBar.style.width).toBe('0%');
  });

  it('shows 50% progress when scrolled halfway', () => {
    setScrollProps({ scrollY: 500, bodyScrollHeight: 2000, innerHeight: 1000 });
    const { container } = render(<TOCWrapper {...defaultProps} />);

    fireEvent.scroll(window);

    const progressBar = container.querySelector('[aria-hidden="true"] > div') as HTMLElement;
    expect(progressBar.style.width).toBe('50%');
  });

  it('shows 100% progress when scrolled to the bottom', () => {
    setScrollProps({ scrollY: 1000, bodyScrollHeight: 2000, innerHeight: 1000 });
    const { container } = render(<TOCWrapper {...defaultProps} />);

    fireEvent.scroll(window);

    const progressBar = container.querySelector('[aria-hidden="true"] > div') as HTMLElement;
    expect(progressBar.style.width).toBe('100%');
  });

  it('shows 0% when the page is not scrollable (scrollMax = 0)', () => {
    // scrollHeight === innerHeight → scrollMax = 0 → no divide-by-zero
    setScrollProps({ scrollY: 0, bodyScrollHeight: 1000, innerHeight: 1000 });
    const { container } = render(<TOCWrapper {...defaultProps} />);

    fireEvent.scroll(window);

    const progressBar = container.querySelector('[aria-hidden="true"] > div') as HTMLElement;
    expect(progressBar.style.width).toBe('0%');
  });

  it('cleans up the scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<TOCWrapper {...defaultProps} />);
    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});
