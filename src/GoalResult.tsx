import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    Typography,
    Container,
    Paper,
    Input,
    IconButton
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CloudUpload as CloudUploadIcon,
    AccessTime as AccessTimeIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';

// 審査ステータスの型を定義
enum AuditStatus {
    PENDING = '審査中',
    SUCCESS = '目標達成',
    FAILURE = '失敗'
}

export default function GoalResultPage() {
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);  // ファイルの型を指定
    const [auditStatus, setAuditStatus] = useState<AuditStatus>(AuditStatus.PENDING);  // Enumの型を使用

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            // ここで画像をバックエンドにアップロードする処理を追加
            // アップロード後、バックエンドからの応答に基づいて setAuditStatus を更新
        }
    };

    const getStatusIcon = (status: AuditStatus) => {
        switch (status) {
            case AuditStatus.PENDING:
                return <AccessTimeIcon style={{ fontSize: 48, color: '#FCD34D' }} />;
            case AuditStatus.SUCCESS:
                return <CheckCircleIcon style={{ fontSize: 48, color: '#10B981' }} />;
            case AuditStatus.FAILURE:
                return <CancelIcon style={{ fontSize: 48, color: '#EF4444' }} />;
            default:
                return null;
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Paper elevation={3} sx={{
                    p: 4,
                    background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)',
                    borderRadius: 2
                }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                        目標達成結果
                    </Typography>
                    <Box my={3}>
                        <Typography variant="h6" gutterBottom>
                            目標達成の証明画像
                        </Typography>
                        <Input
                            type="file"
                            onChange={handleImageUpload}
                            disableUnderline
                            fullWidth
                            endAdornment={
                                <IconButton component="span">
                                    <CloudUploadIcon />
                                </IconButton>
                            }
                        />
                    </Box>
                    <Box my={4} textAlign="center">
                        <Typography variant="h5" gutterBottom>
                            審査結果
                        </Typography>
                        {getStatusIcon(auditStatus)}
                        <Typography variant="h6" color="textSecondary">
                            {auditStatus}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                    >
                        目標設定ページに戻る
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
