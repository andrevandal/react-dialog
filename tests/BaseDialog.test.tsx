import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react';

import BaseDialog from "../src/components/BaseDialog";

import {describe, it, expect, vi, afterEach, beforeAll } from 'vitest'

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
  dialogContent: string | JSX.Element = <p> Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss, é um leite divinis. </p>
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
  const longDialogContent = (
    <>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <img src='https://placehold.co/600x338' style={{
          width: '100%',
          height: 'auto'
        }} width={600} height={338} />
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
    </>
  ); 

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
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

  // it('should call onClose when the Escape key is pressed', () => {
  //   // Implementar a verificação
  // });

  // it('should call onClose when overlay is clicked and closeOnOverlayClick is set to true', () => {
  //   // Implementar a verificação
  // });

  // it('should not call onClose when overlay is clicked and closeOnOverlayClick is set to false', () => {
  //   // Implementar a verificação
  // });

  // it('should render the content and title correctly in the Dialog', () => {
  //   // Implementar a verificação
  // });

  it('should handle scrolling content correctly, especially when there are too many elements in the Dialog', async () => {
    await renderDialog({ isOpen: true, onClose: handleClose, closeOnOverlayClick: true }, longDialogContent);

    const dialogElement = await screen.findByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });
});