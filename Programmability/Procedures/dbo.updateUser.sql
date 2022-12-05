SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 12/10/2022
-- Description:	Update the User's informations, including password
-- =============================================
CREATE PROCEDURE [dbo].[updateUser] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null,
	@firstName varchar(37) = null,
	@lastName varchar(37) = null,
	@dateOfBirth datetime = null,
	@email varchar(37) = null,
	@password varchar(60) = null,
	@currentDate datetime = null,
	@preference varchar(37) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE		Users

	SET			userID = @userID,
				firstName = @firstName,
				lastName = @lastName, 
				dateOfBirth = @dateOfBirth,
				email = @email,
				preference = @preference,
				lastUpdate = @currentDate

	WHERE		userID = @userID

	UPDATE		UserCredentials

	SET			login = @email,
				password = @password,
				lastUpdate = @currentDate

	WHERE		userID = @userID



END
GO