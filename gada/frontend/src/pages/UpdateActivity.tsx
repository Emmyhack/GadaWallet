import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useAnchorProgram } from '../lib/anchor';
import { 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Info,
  Activity,
  Calendar,
  Shield,
  Coins
} from 'lucide-react';

interface ActivityRecord {
  id: string;
  type: 'coin' | 'token';
  heir: string;
  heirName?: string;
  lastActive: string;
  status: 'active' | 'warning' | 'expired';
  daysRemaining: number;
  amount: string;
  tokenMint?: string;
  tokenName?: string;
}

const UpdateActivity = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const program = useAnchorProgram();
  
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockActivities: ActivityRecord[] = [
    {
      id: '1',
      type: 'coin',
      heir: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      heirName: 'Alice Johnson',
      lastActive: '2024-01-15T10:30:00Z',
      status: 'active',
      daysRemaining: 320,
      amount: '2.5',
    },
    {
      id: '2',
      type: 'token',
      heir: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      heirName: 'Bob Smith',
      lastActive: '2024-01-10T14:20:00Z',
      status: 'warning',
      daysRemaining: 45,
      amount: '1000',
      tokenMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      tokenName: 'USDC'
    },
    {
      id: '3',
      type: 'coin',
      heir: '3xJ8Hn9YqK2mN7pQ1rT5vX8zA4bC6dE9fG1hI3jK5lM7n',
      heirName: 'Carol Davis',
      lastActive: '2023-12-01T09:15:00Z',
      status: 'expired',
      daysRemaining: -15,
      amount: '1.0',
    }
  ];

  const fetchActivities = async () => {
    if (!connected || !publicKey) return;
    
    setLoading(true);
    try {
      // In a real implementation, you'd fetch from the contract
      // For now, using mock data
      setTimeout(() => {
        setActivities(mockActivities);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to fetch activity records');
      setLoading(false);
    }
  };

  const handleUpdateActivity = async (activityId: string) => {
    if (!connected || !program || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setUpdating(activityId);
    setError(null);
    
    try {
      // In a real implementation, you'd call the contract
      // await updateActivity(program, tokenHeirPDA);
      console.log('Updating activity for:', activityId);
      
      // Simulate update process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the activity record
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { 
                ...activity, 
                lastActive: new Date().toISOString(),
                status: 'active' as const,
                daysRemaining: 365
              }
            : activity
        )
      );
      
      setSuccess(`Activity updated successfully for ${activityId}`);
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (error) {
      console.error('Error updating activity:', error);
      setError('Failed to update activity. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdateAllActivities = async () => {
    if (!connected || !program || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setUpdating('all');
    setError(null);
    
    try {
      // Update all activities
      const updatePromises = activities
        .filter(activity => activity.status !== 'active')
        .map(activity => handleUpdateActivity(activity.id));
      
      await Promise.all(updatePromises);
      
      setSuccess('All activities updated successfully');
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (error) {
      console.error('Error updating all activities:', error);
      setError('Failed to update all activities. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'expired': return 'error';
      default: return 'dark';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'expired': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusText = (status: string, daysRemaining: number) => {
    switch (status) {
      case 'active':
        return `${daysRemaining} days remaining`;
      case 'warning':
        return `${daysRemaining} days until claimable`;
      case 'expired':
        return 'Assets can be claimed';
      default:
        return 'Unknown status';
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchActivities();
    }
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="container-responsive py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Please connect your Solana wallet to update your activity status.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary btn-lg">
            <span>Connect Wallet</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const needsUpdate = activities.filter(a => a.status !== 'active').length;

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-glass-light transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Update Activity</h1>
          <p className="text-dark-300">Keep your inheritance plan active and prevent premature claims</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="card p-6 mb-8">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Why update activity?</h3>
            <p className="text-dark-300 mb-3">
              Updating your activity resets the timer for your heirs to claim assets. 
              This prevents premature claims and keeps your inheritance plan active.
            </p>
            <div className="text-sm text-dark-400">
              <p>• Activity updates reset the 1-year timer</p>
              <p>• Prevents heirs from claiming assets prematurely</p>
              <p>• Keeps your inheritance plan secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="card p-4 mb-6 bg-success-500/10 border border-success-500/30">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-success-400" />
            <span className="text-success-400">{success}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="card p-4 mb-6 bg-error-500/10 border border-error-500/30">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-error-400" />
            <span className="text-error-400">{error}</span>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold gradient-text-success mb-1">
            {activities.filter(a => a.status === 'active').length}
          </div>
          <div className="text-sm text-dark-400">Active</div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold gradient-text-warning mb-1">
            {activities.filter(a => a.status === 'warning').length}
          </div>
          <div className="text-sm text-dark-400">Warning</div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-error-500 to-error-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold gradient-text-error mb-1">
            {activities.filter(a => a.status === 'expired').length}
          </div>
          <div className="text-sm text-dark-400">Expired</div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold gradient-text-primary mb-1">
            {needsUpdate}
          </div>
          <div className="text-sm text-dark-400">Need Update</div>
        </div>
      </div>

      {/* Activities List */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Activity className="w-6 h-6 text-primary-400" />
            <span>Activity Records</span>
          </h2>
          <div className="flex items-center space-x-3">
            {needsUpdate > 0 && (
              <button
                onClick={handleUpdateAllActivities}
                disabled={updating === 'all'}
                className="btn-warning"
              >
                {updating === 'all' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating All...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Update All ({needsUpdate})</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={fetchActivities}
              disabled={loading}
              className="btn-secondary"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-glass-light border border-glass-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Activity Records</h3>
            <p className="text-dark-300 mb-6">
              You don't have any heirs added yet. Add heirs to start tracking activity.
            </p>
            <button onClick={() => navigate('/add-heir')} className="btn-primary">
              <span>Add Your First Heir</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const StatusIcon = getStatusIcon(activity.status);
              const statusColor = getStatusColor(activity.status);
              const isUpdating = updating === activity.id;
              
              return (
                <div key={activity.id} className="card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${statusColor}-500 to-${statusColor}-600 rounded-xl flex items-center justify-center`}>
                          {activity.type === 'coin' ? (
                            <Coins className="w-6 h-6 text-white" />
                          ) : (
                            <Shield className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {activity.amount} {activity.type === 'coin' ? 'SOL' : activity.tokenName || 'Tokens'}
                          </h3>
                          <p className="text-dark-300">
                            Heir: {activity.heirName || activity.heir.slice(0, 8) + '...' + activity.heir.slice(-8)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-dark-400 mb-1">Last Activity</div>
                          <div className="text-sm text-white">
                            {formatDate(activity.lastActive)}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-dark-400 mb-1">Status</div>
                          <div className={`badge-${statusColor} flex items-center space-x-1`}>
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{activity.status}</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-dark-400 mb-1">Time Remaining</div>
                          <div className="text-sm text-white">
                            {getStatusText(activity.status, activity.daysRemaining)}
                          </div>
                        </div>
                      </div>

                      {activity.status === 'warning' && (
                        <div className="p-3 bg-warning-500/10 border border-warning-500/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-warning-400" />
                            <span className="text-warning-400 text-sm">
                              Update activity soon to prevent premature claims
                            </span>
                          </div>
                        </div>
                      )}

                      {activity.status === 'expired' && (
                        <div className="p-3 bg-error-500/10 border border-error-500/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-error-400" />
                            <span className="text-error-400 text-sm">
                              Assets can now be claimed by heirs. Update activity to reset timer.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-6">
                      {activity.status !== 'active' && (
                        <button
                          onClick={() => handleUpdateActivity(activity.id)}
                          disabled={isUpdating}
                          className="btn-primary"
                        >
                          {isUpdating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-4 h-4" />
                              <span>Update</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary-400" />
          <span>Activity Tips</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-dark-300">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Update activity regularly to keep your inheritance plan secure</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-warning-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Set reminders for when activities are approaching expiration</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-success-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Each update resets the 1-year timer for all your heirs</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-error-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Expired activities allow heirs to claim assets immediately</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateActivity; 