CREATE TABLE [dbo].[Posts] (
  [userID] [varchar](37) NOT NULL,
  [postTitle] [varchar](50) NOT NULL,
  [postCreationDate] [datetime] NOT NULL,
  [postEditDate] [datetime] NOT NULL,
  [postText] [varchar](max) NOT NULL,
  [postCategory] [varchar](10) NOT NULL,
  [imageUrl] [varchar](max) NULL,
  [postID] [varchar](37) NOT NULL,
  CONSTRAINT [PK_Posts] PRIMARY KEY CLUSTERED ([postID]),
  CONSTRAINT [IX_Posts] UNIQUE ([postID])
)
ON [PRIMARY]
TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Posts]
  ADD CONSTRAINT [FK_Posts_Users] FOREIGN KEY ([userID]) REFERENCES [dbo].[Users] ([userID])
GO