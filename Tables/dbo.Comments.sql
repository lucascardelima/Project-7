CREATE TABLE [dbo].[Comments] (
  [commentID] [varchar](37) NOT NULL,
  [postID] [varchar](37) NOT NULL,
  [userID] [varchar](37) NOT NULL,
  [commentText] [varchar](max) NOT NULL,
  [commentCreationDate] [datetime] NOT NULL,
  [commentEditDate] [datetime] NOT NULL,
  CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED ([commentID]),
  CONSTRAINT [IX_Comments] UNIQUE ([commentID])
)
ON [PRIMARY]
TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Comments]
  ADD CONSTRAINT [FK_Comments_Posts] FOREIGN KEY ([postID]) REFERENCES [dbo].[Posts] ([postID])
GO

ALTER TABLE [dbo].[Comments]
  ADD CONSTRAINT [FK_Comments_Users] FOREIGN KEY ([userID]) REFERENCES [dbo].[Users] ([userID])
GO