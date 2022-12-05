SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 05/10/2022
-- Description:	Get an specific user
-- =============================================
CREATE PROCEDURE [dbo].[getUser] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null

AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	SELECT		a.userID,
				a.firstName,
				a.lastName,
				a.dateOfBirth,
				b.login,
				b.password

	FROM Users a

	LEFT JOIN UserCredentials b on a.userID = b.userID

	WHERE a.userID = @userID

	
END
GO