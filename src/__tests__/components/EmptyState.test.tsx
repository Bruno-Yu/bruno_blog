import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmptyState from '../../components/EmptyState/index';

describe('EmptyState', () => {
  describe('default props', () => {
    it('renders the default title', () => {
      render(<EmptyState />);
      expect(screen.getByText('這個分類還沒有筆記')).toBeInTheDocument();
    });

    it('renders the default description', () => {
      render(<EmptyState />);
      expect(
        screen.getByText('這個分類目前還沒有已發布的筆記，可以從其他分類開始探索。'),
      ).toBeInTheDocument();
    });

    it('renders the default CTA link pointing to /', () => {
      render(<EmptyState />);
      const link = screen.getByRole('link', { name: '瀏覽所有筆記' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });
  });

  describe('custom props', () => {
    it('renders a custom title', () => {
      render(<EmptyState title="No notes yet" />);
      expect(screen.getByText('No notes yet')).toBeInTheDocument();
    });

    it('renders a custom description', () => {
      render(<EmptyState description="Come back soon." />);
      expect(screen.getByText('Come back soon.')).toBeInTheDocument();
    });

    it('renders a custom CTA label and href', () => {
      render(<EmptyState ctaLabel="Go to DevOps" ctaHref="/devops" />);
      const link = screen.getByRole('link', { name: 'Go to DevOps' });
      expect(link).toHaveAttribute('href', '/devops');
    });
  });

  describe('recentLinks', () => {
    it('does not render the "最近更新" header when recentLinks is empty', () => {
      render(<EmptyState recentLinks={[]} />);
      expect(screen.queryByText('最近更新')).not.toBeInTheDocument();
    });

    it('renders all links and the section header when recentLinks are provided', () => {
      const links = [
        { title: 'Docker 基礎', href: '/devops/docker', ago: '2d' },
        { title: 'Nginx 設定', href: '/devops/nginx' },
      ];
      render(<EmptyState recentLinks={links} />);

      expect(screen.getByText('最近更新')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Docker 基礎/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Nginx 設定/ })).toBeInTheDocument();
    });

    it('shows the "ago" text for links that have it, and omits it for links without', () => {
      const links = [
        { title: 'Docker 基礎', href: '/devops/docker', ago: '3d' },
        { title: 'Nginx 設定', href: '/devops/nginx' },
      ];
      render(<EmptyState recentLinks={links} />);

      expect(screen.getByText('3d')).toBeInTheDocument();
      // Nginx link has no ago — the text "3d" appears exactly once
      expect(screen.getAllByText('3d')).toHaveLength(1);
    });
  });

  describe('hover interactions', () => {
    it('changes CTA background on hover', async () => {
      const user = userEvent.setup();
      render(<EmptyState />);

      const ctaLink = screen.getByRole('link', { name: '瀏覽所有筆記' });
      const initialBackground = (ctaLink as HTMLElement).style.background;

      await user.hover(ctaLink);

      const hoveredBackground = (ctaLink as HTMLElement).style.background;
      expect(hoveredBackground).not.toBe(initialBackground);
    });

    it('restores CTA background after unhover', async () => {
      const user = userEvent.setup();
      render(<EmptyState />);

      const ctaLink = screen.getByRole('link', { name: '瀏覽所有筆記' });
      const initialBackground = (ctaLink as HTMLElement).style.background;

      await user.hover(ctaLink);
      await user.unhover(ctaLink);

      expect((ctaLink as HTMLElement).style.background).toBe(initialBackground);
    });
  });
});
