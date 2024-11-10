import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const InfoRating = ({ 
  sectionId, 
  initialUpvotes = 0, 
  initialDownvotes = 0,
  onVote = async () => {} 
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

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
    <div style={{
      border: 'var(--border-thickness) solid var(--text-color)',
      padding: 'calc(var(--line-height) / 2) 1ch',
      marginBottom: 'var(--line-height)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1ch' }}>
          <button
            onClick={() => handleVote(true)}
            disabled={isVoting}
            style={{
              border: 'var(--border-thickness) solid var(--text-color)',
              padding: 'calc(var(--line-height) / 4) 1ch',
              background: userVote === true ? 'var(--text-color)' : 'var(--background-color)',
              color: userVote === true ? 'var(--background-color)' : 'var(--text-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '1ch'
            }}
          >
            <ThumbsUp size={16} />
            <span>{upvotes}</span>
          </button>

          <button
            onClick={() => handleVote(false)}
            disabled={isVoting}
            style={{
              border: 'var(--border-thickness) solid var(--text-color)',
              padding: 'calc(var(--line-height) / 4) 1ch',
              background: userVote === false ? 'var(--text-color)' : 'var(--background-color)',
              color: userVote === false ? 'var(--background-color)' : 'var(--text-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '1ch'
            }}
          >
            <ThumbsDown size={16} />
            <span>{downvotes}</span>
          </button>
        </div>

        <span style={{
          fontSize: 'smaller',
          color: 'var(--text-color-alt)'
        }}>
          {upvotes + downvotes} total votes
        </span>
      </div>
    </div>
  );
};

export default InfoRating;