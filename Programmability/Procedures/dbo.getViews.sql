SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 28/11/2022
-- Description:	Get the list of userID that viewed a specific post
-- =============================================
CREATE PROCEDURE [dbo].[getViews] 
	-- Add the parameters for the stored procedure here
	@postID nvarchar(37) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT		userID

	FROM		PostViews

	WHERE		postID = @postID
END
GO