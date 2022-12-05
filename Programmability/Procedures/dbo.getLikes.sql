SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 11/10/2022
-- Description:	Get all likes grouped by post
-- =============================================
CREATE PROCEDURE [dbo].[getLikes] 
	-- Add the parameters for the stored procedure here
	@postID varchar(37) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT		postID,
				userID
				
	FROM		PostLikes
	WHERE		postID = @postID

	SELECT		postID,
				count(*) as quantity

	FROM		PostLikes

	WHERE		postID = @postID 

	GROUP by	postID


END
GO