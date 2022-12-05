SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 15/09/2022
-- Description:	Login User
-- =============================================
CREATE PROCEDURE [dbo].[loginUser] 
	-- Add the parameters for the stored procedure here
	@email nvarchar(50) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT		a.firstName,
				a.lastName,
				a.preference,
				a.email,
				a.profileImage,
				b.userID, 
				b.password

	FROM Users a

	LEFT JOIN UserCredentials b

	ON a.userID = b.userID

	WHERE login = @email

END
GO