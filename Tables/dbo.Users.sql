CREATE TABLE [dbo].[Users] (
  [userID] [varchar](37) NOT NULL,
  [firstName] [varchar](50) NOT NULL,
  [lastName] [varchar](50) NOT NULL,
  [dateOfBirth] [varchar](50) NOT NULL,
  [email] [varchar](50) NOT NULL,
  [preference] [varchar](50) NOT NULL,
  [dateSignup] [datetime] NOT NULL,
  [lastUpdate] [datetime] NOT NULL,
  [profileImage] [varchar](max) NULL,
  CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([userID]),
  CONSTRAINT [IX_Users] UNIQUE ([email])
)
ON [PRIMARY]
TEXTIMAGE_ON [PRIMARY]
GO