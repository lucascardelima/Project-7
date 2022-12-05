SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 10/10/2022
-- Description:	Creates a record for the userID and the postID when a user likes a post
-- =============================================
CREATE PROCEDURE [dbo].[postLike] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null,
	@postID varchar(37) = null,
	@likeID varchar(37) = null,
	@isLiked bit = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO PostLikes (userID, postID, likeID, isLiked)
	VALUES (@userID, @postID, @likeID, @isLiked)
		
	SELECT		postID,
				count(*) as quantity

	FROM		PostLikes

	WHERE		postID = @postID 

	GROUP by	postID
END
GO