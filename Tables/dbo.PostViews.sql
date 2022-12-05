CREATE TABLE [dbo].[PostViews] (
  [viewID] [varchar](37) NOT NULL,
  [userID] [varchar](37) NOT NULL,
  [postID] [varchar](37) NOT NULL,
  CONSTRAINT [PK_PostViews] PRIMARY KEY CLUSTERED ([viewID]),
  CONSTRAINT [IX_PostViews] UNIQUE ([postID], [userID])
)
ON [PRIMARY]
GO

ALTER TABLE [dbo].[PostViews]
  ADD CONSTRAINT [FK_PostViews_Posts] FOREIGN KEY ([postID]) REFERENCES [dbo].[Posts] ([postID])
GO

ALTER TABLE [dbo].[PostViews]
  ADD CONSTRAINT [FK_PostViews_Users] FOREIGN KEY ([userID]) REFERENCES [dbo].[Users] ([userID])
GO