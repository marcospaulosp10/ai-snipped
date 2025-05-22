export interface Snippet {
  id: string;
  text: string;
  summary: string;
}

export interface TextModalProps {
  text: string;
  onClose: () => void;
}
