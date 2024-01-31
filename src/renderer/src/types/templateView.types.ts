export type SupportedAspectRatio = 'Off' | '16/9' | '16/10' | '4/3';

export type TemplateViewType = {
  id: string;
  name: string;
  resolution: {
    width: number;
    height: number;
  };
  resizeable?: boolean;
  aspectRatio: SupportedAspectRatio;
};
