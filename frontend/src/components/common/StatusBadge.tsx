import React from 'react';
import { ReservasiStatus } from '../../services/api';
import { Clock, CheckCircle2, PlayCircle, CheckCheck, XCircle, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: ReservasiStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'BELUM_DIKONFIRMASI':
        return {
          label: 'Menunggu Konfirmasi',
          className: 'badge-pending',
          icon: <Clock size={12} />
        };
      case 'DISETUJUI':
        return {
          label: 'Disetujui',
          className: 'badge-approved',
          icon: <CheckCircle2 size={12} />
        };
      case 'AKTIF':
        return {
          label: 'Sesi Aktif',
          className: 'badge-active',
          icon: <PlayCircle size={12} />
        };
      case 'SELESAI':
        return {
          label: 'Selesai',
          className: 'badge-completed',
          icon: <CheckCheck size={12} />
        };
      case 'DITOLAK':
        return {
          label: 'Ditolak',
          className: 'badge-rejected',
          icon: <XCircle size={12} />
        };
      case 'DIBATALKAN':
        return {
          label: 'Dibatalkan',
          className: 'badge-rejected',
          icon: <AlertTriangle size={12} />
        };
      default:
        return {
          label: status,
          className: 'badge-completed',
          icon: null
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`badge-pill ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  );
};
