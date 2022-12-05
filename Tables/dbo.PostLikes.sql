CREATE TABLE [dbo].[PostLikes] (
  [likeID] [varchar](37) NOT NULL,
  [userID] [varchar](37) NOT NULL,
  [postID] [varchar](37) NOT NULL,
  [isLiked] [bit] NOT NULL CONSTRAINT [DF_postLike_isLiked] DEFAULT (0),
  CONSTRAINT [PK_postLike] PRIMARY KEY CLUSTERED ([likeID]),
  CONSTRAINT [IX_PostLikes] UNIQUE ([postID], [userID])
)
ON [PRIMARY]
GO

ALTER TABLE [dbo].[PostLikes]
  ADD CONSTRAINT [FK_PostLikes_Posts] FOREIGN KEY ([postID]) REFERENCES [dbo].[Posts] ([postID])
GO

ALTER TABLE [dbo].[PostLikes]
  ADD CONSTRAINT [FK_PostLikes_Users] FOREIGN KEY ([userID]) REFERENCES [dbo].[Users] ([userID])
GO