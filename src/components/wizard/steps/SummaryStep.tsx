import { Box, Typography, type SvgIconProps } from '@mui/material';
import React from 'react';

interface SummaryField {
    label: string;
    value: string | number | undefined;
}

interface SummaryStepProps {
    icon: React.ReactElement<SvgIconProps>;
    title?: string;
    fields?: SummaryField[];
    message?: string;
}

export default function SummaryStep({
    icon,
    title = "You're almost done! Here's a summary:",
    fields,
    message,
}: SummaryStepProps) {
    return (
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={(theme) => ({
                    width: '100%',
                    maxWidth: 480,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    boxShadow: theme.shadows[1],
                    px: 4,
                    py: 5,
                    textAlign: 'center',
                })}
            >
                {React.cloneElement(icon, { sx: { fontSize: 40, color: 'secondary.main', mb: 1 } })}
                <Typography variant="h6" gutterBottom color="secondary">
                    {title}
                </Typography>
                <Box sx={{ mt: 3, textAlign: 'left' }}>
                    {message ? (
                        <Typography>{message}</Typography>
                    ) : (
                        fields?.map((field, index) => (
                            <Typography key={index} sx={{ mb: index < fields.length - 1 ? 1 : 0 }}>
                                <Box component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                    {field.label}:
                                </Box>{' '}
                                <Box component="span" sx={{ color: 'text.primary' }}>
                                    {field.value}
                                </Box>
                            </Typography>
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    );
}