import React from 'react';

export default function withViewModel<ViewProps, ViewModelProps>(
    View: React.FunctionComponent<ViewProps & { children?: React.ReactNode }>,
    viewModel: (props: ViewModelProps) => ViewProps & { children?: React.ReactNode },
) {
    return (props: ViewModelProps) => React.createElement(View, viewModel(props));
}
