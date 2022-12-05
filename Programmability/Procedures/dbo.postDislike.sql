SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 10/10/2022
-- Description:	Deletes the record that stores the userID and postID and the like confirmation
-- =============================================
CREATE PROCEDURE [dbo].[postDislike] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null,
	@postID varchar(37) = null
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM PostLikes
	WHERE		userID = @userID
	AND			postID = @postID

	SELECT		postID,
				count(*) as quantity

	FROM		PostLikes

	WHERE		postID = @postID 

	GROUP by	postID
END
GO