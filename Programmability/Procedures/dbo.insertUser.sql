SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 14/09/2022
-- Description:	Inser new user
-- =============================================
CREATE PROCEDURE [dbo].[insertUser] 
	-- Add the parameters for the stored procedure here
	@userID nvarchar(MAX) = null, 
	@firstName nvarchar(50) = null,
	@lastName nvarchar(50) = null,
	@dateOfBirth datetime = null,
	@email nvarchar(50) = null,
	@password nvarchar(60) = null,
	@currentDate datetime = null,
	@preference nvarchar(50) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO		Users (userID, firstName, lastName, dateOfBirth, email, preference, dateSignup, lastUpdate)
	VALUES			(@userID, @firstName, @lastName, @dateOfBirth, @email, @preference, @currentDate, @currentDate)

	INSERT INTO		UserCredentials (userID, login, password, dateSignup, lastUpdate)
	VALUES			(@userID, @email, @password, @currentDate, @currentDate)

	SELECT		a.firstName,
				a.lastName,
				a.preference,
				a.email,
				b.userID, 
				b.password

	FROM Users a

	LEFT JOIN UserCredentials b

	ON a.userID = b.userID

	WHERE login = @email
END
GO