SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 28/11/2022
-- Description:	Update the photo of the user
-- =============================================
CREATE PROCEDURE [dbo].[userPhoto] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null,
	@imageUrl varchar(MAX) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE		Users
	
	SET			profileImage = @imageUrl

	WHERE		userID = @userID
END
GO