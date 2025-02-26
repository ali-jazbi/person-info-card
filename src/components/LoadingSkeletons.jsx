import { Card, CardActions, CardContent, Grid, Skeleton } from '@mui/material';

const LoadingSkeletons = () => {
	// Main render
	return (
		<Grid
			container
			spacing={3}
			sx={{ margin: 1 }}>
			{[1, 2, 3, 4].map((item) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={3}
					key={item}>
					<Card sx={{ maxWidth: 345, height: '100%' }}>
						<Skeleton
							variant='rectangular'
							height={200}
						/>
						<CardContent>
							<Skeleton
								variant='text'
								height={32}
								width='80%'
								sx={{ marginBottom: 1 }}
							/>
							<Skeleton
								variant='text'
								height={20}
								width='60%'
							/>
						</CardContent>
						<CardActions sx={{ m: 1 }}>
							<Skeleton
								variant='rectangular'
								width={70}
								height={36}
								sx={{ borderRadius: 1, marginRight: 1 }}
							/>
							<Skeleton
								variant='rectangular'
								width={90}
								height={36}
								sx={{ borderRadius: 1 }}
							/>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default LoadingSkeletons;
