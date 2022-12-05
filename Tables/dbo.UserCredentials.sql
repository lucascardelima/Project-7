CREATE TABLE [dbo].[UserCredentials] (
  [userID] [varchar](37) NOT NULL,
  [login] [varchar](50) NOT NULL,
  [password] [nvarchar](60) NOT NULL,
  [dateSignup] [datetime] NOT NULL,
  [lastUpdate] [datetime] NOT NULL,
  CONSTRAINT [PK_UserCredentials] PRIMARY KEY CLUSTERED ([userID]),
  CONSTRAINT [IX_UserCredentials] UNIQUE ([login])
)
ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserCredentials]
  ADD CONSTRAINT [FK_UserCredentials_Users] FOREIGN KEY ([userID]) REFERENCES [dbo].[Users] ([userID])
GO