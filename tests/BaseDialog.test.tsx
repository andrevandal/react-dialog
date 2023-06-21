import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react';

import BaseDialog from "../src/components/BaseDialog";

import {describe, it, expect, vi, afterEach } from 'vitest'

const DialogDefaultParagraph = <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

vi.mock('dialog-polyfill', () => {
  return {
    default: {
      registerDialog: vi.fn()
    }
  }
})


type DialogOptions = {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick: boolean;
  title?: string;
}
const renderDialog = (
  options: DialogOptions,
  dialogContent: string | JSX.Element = DialogDefaultParagraph
) => {
  const { isOpen, onClose, closeOnOverlayClick, title } = options;
  return render(
    <BaseDialog {...{ isOpen, onClose, closeOnOverlayClick, title: title || "Título da dialog" }}>
      {dialogContent}
    </BaseDialog>
  );
};

describe('BaseDialog', () => {
  const handleClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render when isOpen is true', async () => {
    await renderDialog({ isOpen: true, onClose: handleClose, closeOnOverlayClick: true });

    const dialogElement = await screen.findByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });

  it('should not render when isOpen is false', async () => {
    await renderDialog({ isOpen: false, onClose: handleClose, closeOnOverlayClick: true });

    const dialogElement = await screen.queryByRole('dialog');
    expect(dialogElement).toBeNull();
  });

  it('should call onClose when the close button is clicked', async () => {
    await renderDialog({ isOpen: true, onClose: handleClose, closeOnOverlayClick: true });

    const dialogElement = await screen.findByRole('dialog') as HTMLElement | null
    const closeButton = await screen.getByRole('close-button');
  
    expect(dialogElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    await fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalled();

  });

  it('should call onClose when the Escape key is pressed', async () => {
    await renderDialog({ isOpen: true, onClose: handleClose, closeOnOverlayClick: true });
  
    const dialogElement = await screen.findByRole('dialog');
  
    expect(dialogElement).toBeInTheDocument();
  
    fireEvent.keyDown(dialogElement, { key: 'Escape', code: 'Escape' });
  
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call onClose when overlay is clicked and closeOnOverlayClick is set to true', async () => {
    await renderDialog({ isOpen: true, onClose: handleClose, closeOnOverlayClick: true });
  
    const dialogElement = await screen.findByRole('dialog');
    
    expect(dialogElement).toBeInTheDocument();

    fireEvent.click(dialogElement);
  
    expect(handleClose).toHaveBeenCalled();
  });
  
  it('should not call onClose when overlay is clicked and closeOnOverlayClick is set to false', async () => {
    await renderDialog({ isOpen: true, onClose: handleClose, closeOnOverlayClick: false });
  
    const dialogElement = await screen.findByRole('dialog');
    
    expect(dialogElement).toBeInTheDocument();
  
    fireEvent.click(dialogElement);
  
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should render the content and title correctly in the Dialog', async () => {
    const dialogTitle = "Meu Título";
    const dialogContentText = "Texto do conteúdo do Dialog";
  
    await renderDialog(
      { isOpen: true, onClose: handleClose, closeOnOverlayClick: true, title: dialogTitle },
      <p>{dialogContentText}</p>
    );
  
    const titleElement = await screen.findByText(dialogTitle);
    const contentElement = await screen.findByText(dialogContentText);
  
    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});