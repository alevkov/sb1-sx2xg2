import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const CompactRating = ({ 
  sectionId, 
  initialUpvotes = 0, 
  initialDownvotes = 0,
  onVote = async () => {}
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const confidence = upvotes / (upvotes + downvotes) || 0;

  const handleVote = async (isUpvote) => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      if (userVote === isUpvote) {
        await onVote(sectionId, null);
        setUpvotes(prev => isUpvote ? prev - 1 : prev);
        setDownvotes(prev => !isUpvote ? prev - 1 : prev);
        setUserVote(null);
      }
      else if (userVote !== null) {
        await onVote(sectionId, isUpvote);
        setUpvotes(prev => isUpvote ? prev + 1 : prev - 1);
        setDownvotes(prev => !isUpvote ? prev + 1 : prev - 1);
        setUserVote(isUpvote);
      }
      else {
        await onVote(sectionId, isUpvote);
        setUpvotes(prev => isUpvote ? prev + 1 : prev);
        setDownvotes(prev => !isUpvote ? prev + 1 : prev);
        setUserVote(isUpvote);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        height: 'var(--line-height) * 1'
      }}
      onMouseEnter={() => setShowStats(true)}
      onMouseLeave={() => setShowStats(false)}
    >
      {/* Consensus bar */}
      <div 
        style={{ 
          width: '6ch',
          height: 'calc(var(--line-height) * 0.75)',
          border: 'var(--border-thickness) solid var(--text-color)',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--background-color)'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${confidence * 100}%`,
            background: 'var(--text-color)',
          }}
        />
      </div>

      {/* Vote buttons - always visible */}
      <div style={{ 
        display: 'flex',
        gap: '0.5ch',
        marginBottom: '2ch',
        height: 'calc(var(--line-height) * 1.5)'
      }}>
        <button
          onClick={() => handleVote(true)}
          disabled={isVoting}
          style={{
            border: 'var(--border-thickness) solid var(--text-color)',
            background: userVote === true ? 'var(--text-color)' : 'var(--background-color)',
            color: userVote === true ? 'var(--background-color)' : 'var(--text-color)',
            height: '100%',
            aspectRatio: '1',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ThumbsUp size={16} />
        </button>

        <button
          onClick={() => handleVote(false)}
          disabled={isVoting}
          style={{
            border: 'var(--border-thickness) solid var(--text-color)',
            background: userVote === false ? 'var(--text-color)' : 'var(--background-color)',
            color: userVote === false ? 'var(--background-color)' : 'var(--text-color)',
            height: '100%',
            aspectRatio: '1',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ThumbsDown size={16} />
        </button>
      </div>

      {/* Stats on hover */}
      {showStats && (
        <div style={{
          position: 'absolute',
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '1ch',
          whiteSpace: 'nowrap',
          fontSize: 'smaller',
          backgroundColor: 'var(--background-color)',
          border: 'var(--border-thickness) solid var(--text-color)',
          padding: '0 0.5ch',
          zIndex: 2
        }}>
          {upvotes} support / {downvotes} dispute
        </div>
      )}
    </div>
  );
};

export default CompactRating;